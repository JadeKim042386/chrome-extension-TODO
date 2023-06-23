document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.getElementById('submit');


    addButton.addEventListener('click', addCheckbox);
    document.querySelector('#newTODO').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addCheckbox();
        }
    });
});

function addCheckbox() {
    var checkboxContainer = document.getElementById('container');
    chrome.storage.local.get(null, function (items) {
        // 마지막 id 추출
        var keys = Object.keys(items)
        var maxId = 0;
        keys.forEach(function (key) {
            var id = parseInt(key);
            if (!isNaN(id) && id > maxId) {
                maxId = id;
            }
        });

        // checkbox 추가
        var newId = maxId + 1;

        var content = document.getElementById('newTODO').value
        document.getElementById('newTODO').value = ""
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = newId.toString();
        checkbox.value = content;
        checkbox.className = "form-check-input"
        var label = document.createElement('label')
        label.htmlFor = newId.toString();
        label.appendChild(document.createTextNode(content));
        var br = document.createElement('br');

        checkbox.addEventListener('click', function () {
            chrome.storage.local.remove(newId.toString(), function () {
                checkboxContainer.removeChild(checkbox);
                checkboxContainer.removeChild(label);
                checkboxContainer.removeChild(br);
            })
        });

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(br);

        // item 추가
        var newItem = {};
        newItem[newId.toString()] = content;
        chrome.storage.local.set(newItem);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    var checkboxContainer = document.getElementById('container');

    // Retrieve all key-value pairs from chrome.storage.local
    chrome.storage.local.get(null, function (items) {
        var keys = Object.keys(items);

        // Create checkboxes for each key-value pair
        keys.forEach(function (key) {
            var value = items[key];

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = key;
            checkbox.value = value;
            checkbox.className = "form-check-input"

            var label = document.createElement('label')
            label.htmlFor = key;
            label.appendChild(document.createTextNode(value));

            var br = document.createElement('br');

            checkbox.addEventListener('click', function () {
                chrome.storage.local.remove(key, function () {
                    checkboxContainer.removeChild(checkbox);
                    checkboxContainer.removeChild(label);
                    checkboxContainer.removeChild(br);
                })
            });

            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            checkboxContainer.appendChild(br);
        });
    });
});
