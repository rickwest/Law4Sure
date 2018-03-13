if (! document.body.classList.contains('law4sure-website-annotation-shift') ) {
    document.body.classList.add('law4sure-website-annotation-shift');
    var el = document.createElement('div');
    el.innerHTML =
        "<div class='law4sure-website-annotation law4sure-danger law4sure-website-annotation-wrapper' style='display: block;'>" +
        "<div class='law4sure-website-annotation-close-message'>Don't show me this again</div>" +
        "<span>This website has been identified as potentially dangerous. Proceed with caution.</span>" +
        "</div>";
    document.body.appendChild(el);
}