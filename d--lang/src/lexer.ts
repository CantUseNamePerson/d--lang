//type
export enum tType {
    num,
    identify,
    equal,
    openParen,
    closeParen,
    let,
    force,
    binary,
    enter
}
//keywords
const keywords:Record<string,tType>={
    "let":tType.let,
    "force":tType.force
}
//single char tokens
const oneCharTokens:Record<string,tType>={
    '(':tType.openParen,
    ')':tType.closeParen,
    '+':tType.binary,
    '-':tType.binary,
    '*':tType.binary,
    '/':tType.binary,
    '=':tType.equal,
    '\n':tType.enter,
};
//token
export interface token{
    val:string,
    type:tType
}
//returns the value and type of the token
const token=(val:string,type:tType):token=>({ val, type })
//sees if what u wrote is a int
const isint=(c:string)=>c>='0'&&c<='9'
//sees if what u wrote is a char
const isalpha=(c:string)=>(c.toUpperCase()!=c.toLowerCase())
//tokenizes everything
export function tokenize(code:string):token[]{
    const tokens=new Array<token>()
    const src=code.split("")
    const firs=src[0]
    const shit=src.shift()!
    const len=src.length
    while(len>0){
        if(oneCharTokens[firs])
            tokens.push(token(shit,oneCharTokens[shit]))
        else{
            if(isint(firs)){
                let num=""
                while(src.length>0&&isint(firs))
                    num+=shit
                tokens.push(token(num,tType.num))
            }
            else if(isalpha(firs)){
                let ident=""
                while(len>0&&isalpha(firs))
                    ident+=shit
                const kw=keywords[ident]
                if(kw==undefined)
                    tokens.push(token(ident,tType.identify))
                else
                    tokens.push(token(ident,kw))
            }
            else if(firs==' '||firs=='\r'||firs=='\t')
                shit
            else{
                console.log("found unknown code at: "+firs)
                console.log("Char code:", firs.charCodeAt(0))
                Deno.exit(1)
            }
        }
    }
    return tokens
}
//test thing
const code=await Deno.readTextFile("./test_file.txt")
for (const i of tokenize(code))
    console.log(i);