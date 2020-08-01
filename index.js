// Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value language=english.
    chrome.storage.sync.get({
      language: 'english'
      
    }, function(items) {
        if(items.language=='malayalam'){
            document.getElementById('quote').textContent='എന്നെ ശക്‌തനാക്കുന്നവനിലൂടെ എല്ലാം ചെയ്യാന്‍ എനിക്കു സാധിക്കും.';
            document.getElementById('verse').textContent='ഫിലിപ്പി 4 : 13';
        }else{
            document.getElementById('quote').textContent='I Can Do All Things Through Christ Who Strengthens Me.';
            document.getElementById('verse').textContent='Philippians 4:13';
        }
    
    });
  }
  
  document.addEventListener('DOMContentLoaded', restore_options);