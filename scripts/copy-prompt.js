<script>
document.addEventListener('DOMContentLoaded', function() {
  // Find all prompt callouts
  const promptCallouts = document.querySelectorAll('.callout-prompt');

  promptCallouts.forEach(function(callout) {
    // Find the callout body where the text is
    const body = callout.querySelector('.callout-body-container');
    if (!body) return;

    // Get the text content (excluding the copy button itself)
    const getPromptText = function() {
      const bodyContent = body.querySelector('.callout-body');
      if (bodyContent) {
        return bodyContent.textContent.trim();
      }
      return body.textContent.trim();
    };

    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'prompt-copy-btn';
    copyBtn.innerHTML = '<i class="fa fa-copy"></i> Kopieren';
    copyBtn.title = 'In die Zwischenablage kopieren';

    // Add click handler
    copyBtn.addEventListener('click', function() {
      const text = getPromptText();
      navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        copyBtn.innerHTML = '<i class="fa fa-check"></i> Kopiert!';
        copyBtn.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(function() {
          copyBtn.innerHTML = '<i class="fa fa-copy"></i> Kopieren';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        copyBtn.innerHTML = '<i class="fa fa-times"></i> Fehler';
        setTimeout(function() {
          copyBtn.innerHTML = '<i class="fa fa-copy"></i> Kopieren';
        }, 2000);
      });
    });

    // Insert button into the callout header
    const header = callout.querySelector('.callout-header');
    if (header) {
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.appendChild(copyBtn);
    }
  });
});
</script>
