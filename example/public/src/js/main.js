const resultModal = new bootstrap.Modal(document.getElementById("resultModal"), {
    keyboard: false,
});

function searchClicked(e, _this_) {
    e.preventDefault();
    const input = $(_this_).prev("input");
    const checkboxes = $(`${$(_this_).data("target-id")} .checkboxes ul li input:checked`);
    const limit = $(`${$(_this_).data("target-id")} .checkboxes #input-limit`).val() || "100";
    const offset = $(`${$(_this_).data("target-id")} .checkboxes #input-offset`).val() || "0";
    const limitoffset = `&limit=${limit}&offset=${offset}`;
    const baseurl = $(_this_).data("url");
    const fields = [];
    let url, params;

    if (input) {
        if (input.val() === "") return console.log("Please insert value");
        if (checkboxes.length === 0) {
            if (input.attr("type") === "number") url = `${baseurl}id=${input.val()}`;
            else {
                if (input.val().length < 3) return console.log("Please insert minimal 3 character");
                url = `${baseurl}q=${input.val()}${limitoffset}`;
            }
        } else {
            checkboxes.toArray().forEach((item) => fields.push(item.value));
            params = `=${input.val()}${limitoffset}&fields=${fields.toString()}`;
            input.attr("type") === "number" ? (url = `${baseurl}id${params}`) : (url = `${baseurl}q${params}`);
        }

        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                const codeElm = $("#resultModal .modal-body pre code");
                codeElm.text(JSON.stringify(response, undefined, 2));
                resultModal.show();
            });
    }
}

function searchClicked2(_this_) {
    const typesearch = $(_this_).data("type");
    const checkboxes = $(`${$(_this_).data("target-id")} .checkboxes ul li input:checked`);
    const limit = $(_this_).prevAll("input#input-limit").val() || "100";
    const offset = $(_this_).prevAll("input#input-offset").val() || "0";
    const limitoffset = `&limit=${limit}&offset=${offset}`;
    const selected = $(_this_).prevAll("select").val();
    const baseurl = $(_this_).data("url");
    const fields = [];
    let params = `${typesearch}=${selected}${limitoffset}`;

    if (checkboxes.length > 0) {
        checkboxes.toArray().forEach((item) => fields.push(item.value));
        params = `${typesearch}=${selected}${limitoffset}&fields=${fields.toString()}`;
    }

    fetch(`${baseurl}${params}`)
        .then((response) => response.json())
        .then((response) => {
            const codeElm = $("#resultModal .modal-body pre code");
            codeElm.text(JSON.stringify(response, undefined, 2));
            resultModal.show();
        });
}
