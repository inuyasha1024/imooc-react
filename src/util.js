export  function  getRedirectPath({type,avatar}) {
/*    console.log(type)
    console.log(avatar)*/
    let url = (type=='boss')? '/boss':'/genius'
    if(!avatar){
        url += 'info'
    }
    return url
}