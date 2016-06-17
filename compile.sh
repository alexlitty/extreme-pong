truncate -s 0 lib.js
find ./js -type f -name '*.js' -exec cat {} + >> lib.js

truncate -s 0 styles.css
find ./css -type f -name '*.css' -exec cat {} + >> styles.css
