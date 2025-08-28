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
//token
export interface token{
    val:string,
    type:tType
}
//returns the value and type of the token
function token(val:string,type:tType):token{

    return {val,type}
}
//sees if what u wrote is a int
function isint(src:string):boolean{
    const c=src.charCodeAt(0)
    const bound=['0'.charCodeAt(0),'9'.charCodeAt(0)]
    return (c>=bound[0]&&c<=bound[1])
}
//sees if what u wrote is a char
function isalpha(src:string):boolean{
    const thing:boolean=src.toUpperCase()!=src.toLowerCase()
    return thing
}
//tokenizes everything
export function tokenize(code:string):token[]{
    const tokens=new Array<token>()
    const src=code.split("")
    while(src.length>0){
        switch(src[0]){
            case ')':
                tokens.push(token(src.shift()!,tType.closeParen))
                break
            case '(':
                tokens.push(token(src.shift()!,tType.openParen))
                break
            case '+':
            case '-':
            case '*':
            case '/':
                tokens.push(token(src.shift()!,tType.binary))
                break
            case '=':
                tokens.push(token(src.shift()!,tType.equal))
                break
            case '\n':
                tokens.push(token(src.shift()!,tType.enter))
                break
            default:
                if(isint(src[0])){
                    let num=""
                    while(src.length>0&&isint(src[0])){
                        num+=src.shift()
                    }
                    tokens.push(token(num,tType.num))
                }
                else if(isalpha(src[0])){
                    let ident=""
                    while(src.length>0&&isalpha(src[0])){
                        ident+=src.shift()
                    }
                    const kw=keywords[ident]
                    if(kw==undefined){
                        tokens.push(token(ident,tType.identify))
                    }
                    else{
                        tokens.push(token(ident,kw))
                    }
                }
                else if(src[0]==' '||src[0]=='\n'||src[0]=='\t'){
                    src.shift()
                }
                else{
                    console.log("found unknown code at: "+src[0]);
                    console.log("Char code:", src[0].charCodeAt(0));
                    Deno.exit(1)
                }
        }
    }
    return tokens
}
const code=await Deno.readTextFile("./test_file.txt")
for (const i of tokenize(code)) {
    console.log(i);
}