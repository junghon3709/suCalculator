function capError(num){
  if(isNaN(+num)){
      return 'Input should be numerical.'
  }else{
      const val = parseFloat(num)
      if (val < 0 || val > 5){
          return 'CAP should be between 0 and 5.'
      }

      if (num.length > 8){
      	return 'That\'s enough numbers, please.'
      }
      else{
      	return ""
      }
  }
}

export default capError;