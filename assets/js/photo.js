$(document).ready(function () {
    const apiKey = "PKC8Rfl2DIQL56w5cRipJlX30iISxJBv";
    const apiUrl = 'https://api.giphy.com/v1/gifs/search';

    const queryParams = {
        q: "",
        api_key: apiKey,
        limit: 10,
        type: 'gif',
        rating: 'pg'
    };

    var namesArray = ["cat", "dog", "mouse", "budgerigar", "llama", "canary", "tiger", "elephant", "whale"];
    var moving = [];

    buildButtonArray();

    function buildButtonArray() {
        $.each(namesArray, function (index) {
            moving.push(false);
            addButton(index);
        });
    }

    function addButton(index) {
        var r = $('<input/>').attr({
            type: "button",
            //            id: namesArray[index],
            value: namesArray[index],
            //            style: "height: 40px",
            class: "button_css",
        });
        $(".buttons").append(r);
    }

    $(document).on("click", ".buttons", function () {
        buildPictures($(document.activeElement).val(), false);
    });

    var newOne;

    $(document).on("click", "#addAnimalButton", function () {
        newOne = $('#addAnimal').val();
        if ($.inArray(newOne, namesArray) != -1) {
            $("#addOneMsg").text(`Already got ${newOne}!`);
        } else {
            var qp = {
                sp: 'animal*',
                ml: newOne,
            }
            var urlToUse = 'http://api.datamuse.com/words/?' + $.param(qp);
            var xhr = $.get(urlToUse);
            xhr.done(function (animals) {
                if (animals.length == 0) {
                    $("#addOneMsg").text(`${newOne} is not an animal!`);
                } else {
                    buildPictures(newOne, true);
                    $("#addOneMsg").text("");
                }
            });
        }
        $("#addAnimal").val('');
    });

    var picturesKeep;

    function buildPictures(animalName, testing) { // testing is to see if entered animal name is real
        queryParams.q = animalName;
        let url = apiUrl + '?' + $.param(queryParams);
        if (!testing) {
            $(".pictures").empty();
        }
        var xhr = $.get(url);
        xhr.done(function (pictures) {
            if (!testing) {
                picturesKeep = pictures;
                $(".row").empty();
                for (var i = 0; i < pictures.data.length; i++) {
                    let newDiv = $('<div>').addClass("col").
                    append(`<div class="caption">Rating: ${pictures.data[i].rating}</div>`).
                    append(`<img id="pict${i}" class="img-responsive" src="${pictures.data[i].images.fixed_height_small_still.url}">`);
                    $(".row").append(newDiv);
                }
            } else {
                 if (pictures.data.length > 0) {
                    namesArray.push(newOne);
                    moving.push(false);
                    addButton(namesArray.length - 1);
                } else {
                    $("#addOneMsg").text('No pictures of ' + newOne + '. :-(');
                }
                return (pictures.data.length);
            }
        });
    }


    // picture click
    $(document).on("click", ".img-responsive", pictureClick);

    function pictureClick() {
        let index;

        // get the picture number
        name = $(this).attr('id');
        name = name.replace('pict', '');
        index = parseInt(name);

        // look at the moving array 
        let movingSrc = `${picturesKeep.data[index].images.fixed_height_small.url}`;
        let stillSrc = `${picturesKeep.data[index].images.fixed_height_small_still.url}`;
        // use attr to set the src of the img on this
        if (moving[index] == true) {
            $(this).attr('src', stillSrc);
            moving[index] = false;
        } else {
            $(this).attr('src', movingSrc);
            moving[index] = true;
            name = namesArray[index];
        }
    }
});
