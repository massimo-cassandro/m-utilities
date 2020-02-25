    // forked from https://community.adobe.com/t5/Illustrator/Script-to-Sort-Artboard-List-Alphabetically/td-p/9558395

    function sortArtboard() {
        var doc = app.activeDocument,
            properties = [],
            i,
            max;

        function copyProperties(source) {
            var props = {},
                key;
            for (key in source) {
                try {
                    props[key] = source[key];
                } catch (e) {
                }
            }
            return props;
        }

        function pasteProperties(source, destination) {
            var key;
            for (key in source) {
                destination[key] = source[key];
            }
        }

        function compareName(a, b) {
            var comparison = 0,
                name1 = a.name,
                name2 = b.name;

            if(!/^@/.test(name1)) {
                name1 += 'z';
            }
            if(!/^@/.test(name2)) {
                name2 += 'z';
            }
            name1 = name1.replace(/^@/, '');
            name2 = name2.replace(/^@/, '');

            if (name1 > name2) {
                comparison = 1;
            } else if (name1< name2) {
                comparison = -1;
            }
            return comparison;
        }

        for (i = 0, max = doc.artboards.length; i < max; i += 1) {
            properties.push(copyProperties(doc.artboards[i]));
        }

        properties.sort(compareName);

        for (i = 0, max = doc.artboards.length; i < max; i += 1) {
            pasteProperties(properties[i], doc.artboards[i]);
        }

    }

    sortArtboard();
