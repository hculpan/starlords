import { KeyedCollection } from './Dictionary';
const words:string[] = [
    "ald", "en", "al", "ec", "an", "ton", "ar", "den", "ar", "len", "arm",
    "and", "ar", "ron", "aug", "ustus", "ben", "edict", "ben", "nett", "bran",
    "den", "bren", "don", "britt", "brod", "car", "ter", "chas", "chet", "cole",
    "cor", "dell", "dal", "ton", "dam", "dan", "te", "dar", "rell", "dar", "ron",
    "dar", "win", "dew", "itt", "dil", "lon", "dome","nic","don","ovan","dor","ian",
    "dor","sey","ed","ison","er","ich","galen","garret","gas","ton","gav","in","ger",
    "man","gra","ham","hal","hank","har","lan","hay","den","her","schel","hoyt",
    "hun","ter","isa","ias","is","sac","jac","into","jar","red","jon","as",
    "kend","rick","ken","eth","ken","nith","kev","en","leif","len","ard","lin",
    "coln","lin","wood","luc","ius","lyn","wood","mal","colm","mal","ik","max",
    "well","mc","kin","ley","mer","lin","mer","rill","mic","hal","mon","ty",
    "new ","new","ton","nolan","por","ter","quin","ton","rap","raph","hael","reid",
    "rory","scot","ty","shad","stan","ton","stef","an","thad","deus","tob","ias",
    "tren","ton","van","ce","wal","ker","wal","ton","wel","don","wes","wes",
    "ton","wil","lian","win","ford","wya","and","rom","eda","gal","axy","oid",
    "polar"
];


export class NameGenerator {
    generateName(): string {
        let result = this.markov(2, 3);
        return result.charAt(0).toUpperCase() + result.substr(1);
    }

    markov(keySize: number, outputSize: number): string {
        let dict: KeyedCollection<string[]> = new KeyedCollection<string[]>();

        for (let i = 0; i < (words.length - keySize); ++i) {
            let key: string = words[i];
            for (let j = i + 1; j < i + keySize; ++j) {
                key += ' ' + words[j];
            }
            let value: string = (i + keySize < words.length) ? words[i + keySize] : "";
            if (!dict.ContainsKey(key)) {
                let list: string[] = [];
                list.push(value);
                dict.Add(key, list);
            } else {
                dict.Item(key).push(value);
            }
        }
 
        let n = 0;
        let rn: number = Math.floor(Math.random() * dict.Count());
        let prefix: string = dict.Keys()[rn];
        let output: string[] = prefix.split(" ");
 
        while (true) {
            let suffix: string[] = dict.Item(prefix);
            if (suffix.length == 1) {
                if (suffix[0] === "") return output.reduce((a, b) => a + b);
                output.push(suffix[0]);
            } else {
                rn = Math.random() * dict.Count();
                output.push(suffix[rn]);
            }
            if (output.length >= outputSize) return output.slice(0, outputSize).reduce((a, b) => a + b);
            n++;
            prefix = output.slice(n, n + keySize).reduce((a, b) => a + b).trim();
        }    

    }
    
}