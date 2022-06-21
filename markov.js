/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {    
    let theChainKeys = [];
    let aChain = new Map()
      for (let i = 0; i < this.words.length; i++) {
        let theWord = this.words[i];
        let theNextWord = this.words[i + 1] || null;
        if (aChain.has(theWord)) {
          aChain.get(theWord).push(theNextWord);
        } else {
          aChain.set(theWord, [theNextWord]);
          theChainKeys.push(theWord)
        }
    }
    this.chain = aChain;
    this.theChainKeys = theChainKeys;
  }

  /** return random text from chains */

  makeText(numWords = 200) {
    // TODO
    let theText = [];
    let theChainKey = this.theChainKeys[Math.floor(Math.random() * this.theChainKeys.length)];
    while (theText.length < numWords && theChainKey !== null) {    
      theText.push(theChainKey)
      theChainKey = this.chain.get(theChainKey)[Math.floor(Math.random() * this.chain.get(theChainKey).length)]      
    }
    return theText.join(" ")
  }
}

module.exports = {
  MarkovMachine,
};
