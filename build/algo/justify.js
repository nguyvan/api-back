function split_text(text) {
    return text.split(/\r?\n/g);
}
function split_word(text) {
    return text.split(" ");
}
function add_space_to_a_line(context, begin, end, num_space) {
    // number of line in a single line
    let num_words = end - begin + 1;
    let line = "";
    for (let i = begin; i < end; i++) {
        line += context[i];
        --num_words;
        let num_curr_space = Math.ceil(num_space / num_words);
        line += new Array(num_curr_space + 1).join(" ");
        num_space -= num_curr_space;
    }
    line += context[end];
    line += new Array(num_space + 1).join(" ");
    return line;
}
function justify_text(context, max_length) {
    let curr_line_start = 0;
    let num_words_curr_line = 0;
    let curr_line_length = 0;
    let result = [];
    for (let i = 0; i < context.length; i++) {
        ++num_words_curr_line;
        let lookahead_line_length = curr_line_length
            + context[i].length
            + (num_words_curr_line - 1);
        if (lookahead_line_length == max_length) {
            let ans = add_space_to_a_line(context, curr_line_start, i, i - curr_line_start);
            result.push(ans);
            curr_line_start = i + 1;
            // num of words in the current line
            // and current line length set to 0
            num_words_curr_line = 0;
            curr_line_length = 0;
        }
        else if (lookahead_line_length > max_length) {
            let ans = add_space_to_a_line(context, curr_line_start, i - 1, max_length - curr_line_length);
            result.push(ans);
            curr_line_start = i;
            num_words_curr_line = 1;
            curr_line_length = context[i].length;
        }
        else {
            curr_line_length
                += context[i].length;
        }
    }
    if (num_words_curr_line > 0) {
        let line = add_space_to_a_line(context, curr_line_start, context.length - 1, num_words_curr_line - 1);
        line += new Array(max_length - curr_line_length - (num_words_curr_line - 1) + 1).join(" ");
        // Insert the last line
        // left-aligned to result
        result.push(line);
    }
    return result;
}
function get_justify_text(str, max_length) {
    let result = "";
    for (let text of split_text(str)) {
        for (let line of justify_text(split_word(text), max_length)) {
            result += line + "\n";
        }
    }
    return result;
}
export default get_justify_text;
