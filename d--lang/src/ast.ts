export type nType=
    |"code"
    |"numLit"
    |"identify"
    |"bin"
    |"call"
    |"unary"
    |"func"
export interface statment{
    kind:nType
}
export interface code extends statment{
    kind:"code"
    body:statment[]
}
export interface expr extends statment{}
export interface bin extends expr{
    left:expr
    right:expr
    operator:string
    kind:"bin"
}
export interface identify extends expr{
    kind:"identify"
    symbol:string
}
export interface numLit extends expr{
    kind:"numLit"
    val:number
}
