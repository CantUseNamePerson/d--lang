export enum tType {
    num,
    identify,
    equal,
    openParen,
    closeParen,
    let,
    force,
    binary

}
export interface token{
    val:string,
    type:tType
}
function token(val:string,type:tType):token{

    return {val,type}
}
function isint(src:string):boolean{
    const c=src.charCodeAt(0)
    const bound=['0'.charCodeAt(0),'9'.charCodeAt(0)]
    return (c>=bound[0]&&c<=bound[1])
}
function isalpha(src:string):boolean{
    const thing:boolean=src.toUpperCase()!=src.toLowerCase()
    return thing
}
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
            default:
                if(isint(src[0])){
                    let num=""
                    while(src.length>0&&isint(src[0])){
                        num+=src.shift()
                    }
                    tokens.push(token(num,tType.num))
                }
                if(isalpha(src[0])){
                    let num=""
                    while(src.length>0&&isalpha(src[0])){
                        num+=src.shift()
                    }
                    tokens.push(token(num,tType.num))
                }
        }
    }
    return tokens
}