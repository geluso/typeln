import JSON

function get_words()
  path = "../js/words/words-back-traced.json"
  jj = JSON.parse(String(read(path)))
  return jj
end

function generate_dict()
  atoz = "abcdefghijklmnopqrstuvwxyz"
  println("const LETTER_ENDS = {}")
  for first_letter in atoz
    # LETTER_ENDS[first_letter] = []
    println("LETTER_ENDS['",first_letter,"'] = []")
    for last_letter in atoz
      # LETTER_ENDS[first_letter][last_letter] = []
      println("LETTER_ENDS['",first_letter,"']['",last_letter,"'] = []")
    end
  end

  words = get_words()
  for word in words
    backtraced = first(word)
    english = last(word)
    first_letter = first(backtraced)
    last_letter = last(backtraced)
    
    # obj = {back: backtraced, english: english}
    # LETTER_ENDS[first_letter][last_letter].push(obj)
    println("obj = {back: '",backtraced,"', english: '",english,"'}")
    println("LETTER_ENDS['",first_letter,"']['",last_letter,"'].push(obj)")
  end
end

generate_dict()
