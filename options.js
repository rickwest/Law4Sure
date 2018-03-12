// Saves options to chrome.storage.sync.
function save_options() {
    var showBanner = document.querySelector('input[name="banner"]:checked').value;

    chrome.storage.sync.set({
        showBanner: showBanner,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores radio button state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value banner = 'yes'
    chrome.storage.sync.get({showBanner: 'yes'}, function(choices) {
        document.bannerChoiceForm.banner.value = choices.showBanner;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);