-- Keeps only level-2 headings (slide titles) and the content of {.notes} divs.
-- Strips raw HTML, OJS/code blocks, images, and other non-text content so the
-- result is safe to render to PDF via LaTeX.

local function is_notes(div)
  if not div.classes then return false end
  for _, c in ipairs(div.classes) do
    if c == "notes" then return true end
  end
  return false
end

-- Replace inline raw HTML (e.g. <br>) with a soft line break or strip it.
local function clean_inlines(inlines)
  local out = {}
  for _, il in ipairs(inlines) do
    if il.t == "RawInline" then
      local fmt = il.format or ""
      local txt = il.text or ""
      if fmt == "html" and txt:lower():match("^<br") then
        table.insert(out, pandoc.LineBreak())
      elseif fmt == "tex" or fmt == "latex" then
        table.insert(out, il)
      end
      -- otherwise drop the raw inline
    else
      if il.content then
        il.content = clean_inlines(il.content)
      end
      table.insert(out, il)
    end
  end
  return out
end

-- Recursively clean a list of blocks: drop raw HTML/code, clean inlines.
local function clean_blocks(blocks)
  local out = {}
  for _, b in ipairs(blocks) do
    if b.t == "RawBlock" then
      local fmt = b.format or ""
      if fmt == "tex" or fmt == "latex" then
        table.insert(out, b)
      end
      -- drop html, css, etc.
    elseif b.t == "CodeBlock" then
      -- drop code blocks (ojs, r, etc.)
    elseif b.t == "Div" then
      b.content = clean_blocks(b.content)
      -- unwrap most divs into their cleaned content
      for _, inner in ipairs(b.content) do
        table.insert(out, inner)
      end
    else
      if b.content and type(b.content) == "table" then
        -- could be inlines (Para, Plain, Header) or blocks (BlockQuote, etc.)
        if b.t == "Para" or b.t == "Plain" or b.t == "Header" then
          b.content = clean_inlines(b.content)
        else
          b.content = clean_blocks(b.content)
        end
      end
      table.insert(out, b)
    end
  end
  return out
end

-- Drop HTML raw blocks injected by other filters (e.g. custom-callout's
-- in-header <style> block) from the resolved document header.
local function strip_html_from_meta(meta)
  for _, key in ipairs({ "header-includes", "include-before-body", "include-after-body" }) do
    local val = meta[key]
    if val ~= nil then
      local items = val
      if val.t == "MetaInlines" or val.t == "MetaBlocks" then
        items = { val }
      end
      local kept = {}
      for _, item in ipairs(items) do
        local has_html = false
        if item.t == "MetaBlocks" then
          for _, b in ipairs(item) do
            if b.t == "RawBlock" and (b.format == "html" or b.format == "css") then
              has_html = true
              break
            end
          end
        elseif item.t == "MetaInlines" then
          for _, il in ipairs(item) do
            if il.t == "RawInline" and (il.format == "html" or il.format == "css") then
              has_html = true
              break
            end
          end
        end
        if not has_html then
          table.insert(kept, item)
        end
      end
      if val.t == "MetaInlines" or val.t == "MetaBlocks" then
        meta[key] = kept[1]
      else
        meta[key] = kept
      end
    end
  end
  return meta
end

function Pandoc(doc)
  local out = {}
  local function walk(blocks)
    for _, b in ipairs(blocks) do
      if b.t == "Header" and b.level <= 2 then
        b.content = clean_inlines(b.content)
        table.insert(out, b)
      elseif b.t == "Div" and is_notes(b) then
        local cleaned = clean_blocks(b.content)
        for _, inner in ipairs(cleaned) do
          table.insert(out, inner)
        end
      elseif b.t == "Div" then
        walk(b.content)
      end
    end
  end
  walk(doc.blocks)
  doc.blocks = out
  doc.meta = strip_html_from_meta(doc.meta)
  return doc
end
