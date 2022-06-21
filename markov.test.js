const { MarkovMachine } = require("./markov");

    test('makes a chain from input', function () {
        let mm = new MarkovMachine("the cat the cat hat the hat cat");
        expect(mm.chain).toEqual(new Map([
            ["the", ["cat", "cat", "hat"]],
            ["cat", ["the", "hat", null]],
            ["hat", ["the", "cat"]]]));
        });
        
    test('makes text from input', function () {
        let mm = new MarkovMachine("the cat hat");
        let text = mm.makeText()
        expect(["the cat hat", "cat hat", "hat"]).toContain(text)
        });
        
    test("text returned is a string", function () {
        let mm = new MarkovMachine("alas poor Yorick I knew him Horatio a fellow of infinite jest");
        expect(mm.makeText()).toEqual(expect.any(String));
        });        
            
    test("ok with empty input file", function () {
        let mm = new MarkovMachine("");
        expect(mm.makeText()).toEqual("");
        });        
            
    test("ok with one word in input file", function () {
        let mm = new MarkovMachine("one");
        expect(mm.makeText()).toEqual("one");
        });        
        
