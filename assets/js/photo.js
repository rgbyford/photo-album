$(document).ready(function () {
    const apiKey = "PKC8Rfl2DIQL56w5cRipJlX30iISxJBv";
    const apiUrl = 'http://api.giphy.com/v1/gifs/search';

    const queryParams = {
        api_key: apiKey,
        limit: 10,
        type: 'gif',
        //    rating: 'g',
        q: "kangaroo"
    };

    let jsonString = JSON.stringify(queryParams);
    jsonString = jsonString.replace(/{|}/g, ''); // get rid of braces
    jsonString = jsonString.replace(/"/g, ''); // and quotes
    jsonString = jsonString.replace(/,/g, "&"); // replace , with &
    jsonString = jsonString.replace(/:/g, "="); // replace : with =
    let url = apiUrl + '?' + jsonString;

    //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=PKC8Rfl2DIQL56w5cRipJlX30iISxJBv&limit=5");
    var xhr = $.get(url);
    xhr.done(function (pictures) {
        console.log("success got data", pictures);
        console.log(`Data: ${pictures.data.length}`);
        for (var i = 0; i < pictures.data.length; i++) {
            console.log("number " + i);
            console.log(pictures.data[i]);
            console.log(`HTML string: src='${pictures.data[i].url}'`);
            //        $(".pictures").append (`<img src='${pictures.data[i].url}' alt='help' style='width: 100px; height: 100px'>`);
            //$(".pictures").append (`<iframe src="https://giphy.com/embed/5FM4518vPXoru" width="480" height="219" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kangaroo-5FM4518vPXoru"></a></p>`);
            //$(".pictures").append (`<iframe id="pict" src="${pictures.data[i].embed_url}" width="480" height="219" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kangaroo-5FM4518vPXoru"></a></p>`);
            //      $(".pictures").append(`<iframe id="pict" src="${pictures.data[i].embed_url}" width="480" height="219" frameBorder="0" class="giphy-embed"></iframe><p><a href="${pictures.data[i].embed_url}"></a></p>`);
            //        $(".pictures").append(`<iframe id="pict" src="${pictures.data[i].images['480w_still']}" width="480" height="219" frameBorder="0" class="giphy-embed"></iframe>`);
            //        $(".pictures").append(`<img class="pict" src="${pictures.data[i].embed_url}" width="480" height="219" frameBorder="0" class="giphy-embed">`);
            $(".pictures").append('<img class="pict" src="./assets/unhappy-Thomas.jpg" width="480" height="219">');
            $(".pictures").append(`<img class="pict" src="https://giphy.com/embed/5FM4518vPXoru" width="480" height="219" frameBorder="0">`);
            $(".pict").stop();
            //        $.fx.off = true;
            //        $("#pict").freezeframe();
        }
        //    https://giphy.com/gifs/5FM4518vPXoru/html5
    });
});