import{v,p as p$1,l,S}from"./vendor.fa6e9238.js";const p=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};p();function range(t){return Array.from({length:t},(n,o)=>o)}function spreadsheetColumn(t){return String.fromCharCode("A".charCodeAt(0)+t)}class SpreadsheetData{constructor(t,n){this.rows=t,this.cols=n,this.cells=Array.from({length:n*t},()=>({value:0,computedValue:0}))}getCell(t,n){return this.cells[n*this.cols+t]}idxToCoords(t){return[t%this.cols,Math.floor(t/this.cols)]}generateCode(t,n){const o=this.getCell(t,n);return`(function () {
      ${this.cells.map((a,e)=>{const[r,s]=this.idxToCoords(e);return`const ${`${spreadsheetColumn(r)}${s}`} = ${a.value};`}).join(`
`)}
      return ${o.value};
    })();`}computeCell(x,y){const cell=this.getCell(x,y);let result;try{result=eval(this.generateCode(x,y))}catch(t){result=`#ERROR ${t.message}`}const hasChanged=result!=cell.computedValue;return cell.computedValue=result,hasChanged}computeAllCells(){let t=!1;for(const n of range(this.rows))for(const o of range(this.cols))t=t||this.computeCell(o,n);return t}propagateAllUpdates(){for(;this.computeAllCells(););}}function useSpreadsheetData(t,n){const[{data:o},a]=p$1(({data:e},{x:r,y:s,value:u})=>{const c=e.getCell(r,s);return c.value=u,e.propagateAllUpdates(),{data:e}},{data:new SpreadsheetData(t,n)});return[o,a]}function Spreadsheet({rows:t,cols:n}){const[o,a]=useSpreadsheetData(t,n);return v("table",null,v("tr",null,v("td",null),range(n).map(e=>v("td",null,spreadsheetColumn(e)))),range(t).map(e=>v("tr",null,v("td",null,e),range(n).map(r=>v("td",null,v(Cell,{x:r,y:e,cell:o.getCell(r,e),set:s=>a({x:r,y:e,value:s})}))))))}function Cell({x:t,y:n,cell:o,set:a}){const[e,r]=l(!1);return e?v("input",{type:"text",value:o.value,onblur:s=>{r(!1),a(s.target.value)}}):v("span",{onclick:()=>r(!0)},o.computedValue)}const main=document.querySelector("main");S(v(Spreadsheet,{rows:10,cols:10}),main);