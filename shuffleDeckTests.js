var naive = function(deck) {
  for( var i = 0; i < deck.length; i++ ){
    var index = Math.floor(Math.random() * deck.length);
    var temp = deck[index];
    deck[index] = deck[i];
    deck[i] = temp;
  }
  return deck;
};

var unbiased = function(deck) {
  for( var i = 0; i < deck.length; i++ ){
    var index = i + Math.floor(Math.random() * (deck.length - i));
    var temp = deck[index];
    deck[index] = deck[i];
    deck[i] = temp;    
  }
  return deck;
};

var naiveAll = function(deck) {
  var results = {};
  var findAll = function(deck, iteration) {
    iteration = iteration || 0;

    //base case
    if( iteration === deck.length ){
      var key = deck.reduce(function(previousVal, currentVal) {
        return previousVal + currentVal.toString();
      }, '');
      if( !results[key] ){
        results[key] = 1;
      } else {
        results[key]++;
      }
    } else {
      for( var i = 0; i < deck.length; i++ ){
        //swap them
        var temp = deck[i];
        deck[i] = deck[iteration];
        deck[iteration] = temp; 

        //recurse down the tree 
        findAll( deck, iteration + 1 );

        //unswap them so that the next loop starts with the same deck
        var temp = deck[i];
        deck[i] = deck[iteration];
        deck[iteration] = temp;   
      }
    }
  };

  findAll(deck);
  return results;
};

var makeFreqTable = function(deck) {
  freqObj = naiveAll(deck);
  var result = [];
  for( var key in freqObj ){
    if( result[freqObj[key]] ){
      result[freqObj[key]].push(key);
    } else {
      result[freqObj[key]] = [key];
    }
  }
  return result;
};