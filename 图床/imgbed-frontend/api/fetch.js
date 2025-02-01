export const url=process.env.NEXT_PUBLIC_BASEURL

export const GET =async(path)=>{
    var js
    await fetch(url+path).then(res=>{
        return res.json()
    }).then(res=>{
        js=res
    }).catch(e=>{
        console.log(e)
    })
    return js;
}

export const POST=async(path,data)=>{
    var js
    await fetch(url+path,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(res=>{
        return res.json()
    }).then(res=>{
        js=res
    }).catch(e=>{
        console.log(e)
    })
    return js;
}

export const FormPost=async(path,data)=>{
    var js
    await fetch(url+path,{
        method:'post',
        body:data
    }).then(res=>{
        return res.json()
    }).then(res=>{
        js=res
    }).catch(e=>{
        console.log(e)
    })
    return js;
}