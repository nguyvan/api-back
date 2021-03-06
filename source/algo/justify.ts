
// split paragraph
function split_text(text: string): string[]{
    return text.split(/\r?\n/g);
}


// split each word 
function split_word(text: string): string[]{
    return text.split(" ");
}


function add_space_to_a_line(context: string[], begin: number, end: number, num_space: number) : string{
    // number of word in a single line
    let num_words: number = end - begin + 1
    let line: string = "";
    for (let i: number = begin; i < end; i++) {
        line += context[i];
        --num_words;
        let num_curr_space: number
            = Math.ceil(num_space / num_words);
        line += new Array(num_curr_space + 1).join(" ");
        num_space -= num_curr_space
    }
    line += context[end]
    line += new Array(num_space + 1).join(" ");
    return line;
}

function justify_text(context: string[], max_length: number): string[] {
    let curr_line_start: number = 0; // start of the current line
    let num_words_curr_line: number = 0; // number of words in the current line
    let curr_line_length: number = 0; // current length of line

    let result: string[] = [];
    for (let i: number = 0; i < context.length; i++) {
        ++num_words_curr_line;
        let lookahead_line_length: number = curr_line_length 
              + context[i].length // length of current word
              + (num_words_curr_line - 1); // add space
        if (lookahead_line_length == max_length) {
            let ans: string = add_space_to_a_line(context, curr_line_start, i, i - curr_line_start)
            result.push(ans)
            curr_line_start = i + 1;
  
            // num of words in the current line
            // and current line length set to 0
            num_words_curr_line = 0;
            curr_line_length = 0;
        }
        else if (lookahead_line_length > max_length) {
            let ans: string
                = add_space_to_a_line(
                    context,
                    curr_line_start,
                    i - 1,
                    max_length - curr_line_length);
            result.push(ans)
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
        let line: string
            = add_space_to_a_line(
                context,
                curr_line_start,
                context.length - 1,
                num_words_curr_line - 1);

        line += new Array(max_length - curr_line_length - (num_words_curr_line - 1) + 1).join(" ")

        // Insert the last line
        // left-aligned to result
        result.push(line)
    }

    return result;
}

function get_justify_text(str: string, max_length: number): string{

    let result: string = ""
    for (let text of split_text(str)) {
        for (let line of justify_text(split_word(text), max_length)) {
            result += line + "\n"
        }
    }
    return result

}


export default get_justify_text;