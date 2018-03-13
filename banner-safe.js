if (! document.body.classList.contains('law4sure-website-annotation-shift') ) {
    document.body.classList.add('law4sure-website-annotation-shift');
    var el = document.createElement('div');
    el.innerHTML =
        "<div class='law4sure-website-annotation law4sure-safe law4sure-website-annotation-wrapper' style='display: block;'>" +
        "<div class='law4sure-website-annotation-close-message'>Don't show me this again</div>" +
        "<span>If the Law4Sure scales of justice are green it means this URL is safe.</span>" +
        "</div>";
    document.body.appendChild(el);
}