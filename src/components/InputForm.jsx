// src/components/InputForm.jsx
import { useState } from "react";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommon from "@zxcvbn-ts/language-common";
import * as zxcvbnEn from "@zxcvbn-ts/language-en";

// Initialize zxcvbn-ts
zxcvbnOptions.setOptions({
  dictionary: { ...zxcvbnCommon.dictionary, ...zxcvbnEn.dictionary },
  graphs: zxcvbnCommon.adjacencyGraphs,
  translations: zxcvbnEn.translations
});

// Similarity functions
function damerauLevenshteinSimilarity(s1, s2) {
  if (!s1 && !s2) return 1;
  if (!s1 || !s2) return 0;
  const len1 = s1.length, len2 = s2.length;
  const dp = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));
  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i-1] === s2[j-1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i-1][j] +1,
        dp[i][j-1] +1,
        dp[i-1][j-1]+cost
      );
      if (i>1 && j>1 && s1[i-1]===s2[j-2] && s1[i-2]===s2[j-1]){
        dp[i][j] = Math.min(dp[i][j], dp[i-2][j-2]+cost);
      }
    }
  }
  const score = dp[len1][len2];
  const maxLen = Math.max(len1,len2);
  return 1 - score/maxLen;
}

function cosineSimilarity(s1,s2){
  const chars = new Set([...s1,...s2]);
  if(!chars.size) return 0;
  const idx = {}; Array.from(chars).forEach((ch,i)=>idx[ch]=i);
  const v1=Array(chars.size).fill(0), v2=Array(chars.size).fill(0);
  for(const ch of s1) v1[idx[ch]]+=1;
  for(const ch of s2) v2[idx[ch]]+=1;
  let dot=0, mag1=0, mag2=0;
  for(let i=0;i<chars.size;i++){dot+=v1[i]*v2[i]; mag1+=v1[i]**2; mag2+=v2[i]**2;}
  return mag1&&mag2 ? dot/(Math.sqrt(mag1)*Math.sqrt(mag2)) : 0;
}

export default function InputForm({ formData, setFormData, setResults, filipinoDict }) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tokens = formData.tokens.map(t => t.trim()).filter(t=>t);
    
    // Default zxcvbn
    const oldDefault = zxcvbn(formData.oldPassword, tokens);
    const newDefault = zxcvbn(formData.newPassword, tokens);

    // With Filipino dictionary
    let oldFilipino = oldDefault, newFilipino = newDefault;
    if(formData.useFilipino){
      const combinedTokens = tokens.concat(filipinoDict);
      oldFilipino = zxcvbn(formData.oldPassword, combinedTokens);
      newFilipino = zxcvbn(formData.newPassword, combinedTokens);
    }

    const dlSim = damerauLevenshteinSimilarity(formData.oldPassword, formData.newPassword);
    const cosSim = cosineSimilarity(formData.oldPassword, formData.newPassword);

    setResults({
      oldDefault, newDefault,
      oldFilipino, newFilipino,
      dlSim, cosSim
    });
  };

  return (
    <section className="input-section">
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} required/>
        </label>
        <label>Personal Tokens (comma-separated):
          <input type="text" value={formData.tokens.join(',')} onChange={e=>setFormData({...formData,tokens:e.target.value.split(',')})}/>
        </label>
        <label>Old Password:
          <input type={showOld?"text":"password"} value={formData.oldPassword} onChange={e=>setFormData({...formData,oldPassword:e.target.value})}/>
          <button type="button" onClick={()=>setShowOld(!showOld)}>👁</button>
        </label>
        <label>New Password:
          <input type={showNew?"text":"password"} value={formData.newPassword} onChange={e=>setFormData({...formData,newPassword:e.target.value})}/>
          <button type="button" onClick={()=>setShowNew(!showNew)}>👁</button>
        </label>
        <label>
          <input type="checkbox" checked={formData.useFilipino} onChange={e=>setFormData({...formData,useFilipino:e.target.checked})}/>
          Include Filipino Dictionary
        </label>
        <button type="submit">Analyze</button>
      </form>
    </section>
  );
}
