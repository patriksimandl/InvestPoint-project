export function formatPrice(dailyChange: number) {
  

  if(dailyChange < 0){
    return (`- $${(-dailyChange).toFixed(2)}`)
  }
  else if(dailyChange> 0){
    return (`+ $${(dailyChange).toFixed(2)}`)
  }
  else{
    return ("$0")
  }
}