import { personalityPrompt } from "./personalities/mafuyu.prompt";

export const SystemPrompt = ():string => {
    return(`
        ${personalityPrompt} Greet the candidate as a mock interviwer, use candidate name and position.Warmly introduce and revise the job description (JD), explain about the mock interview in less than 300 words.
        Output in JSON format only, with these keys:
        - message: String (your greeting message)
        `)
}

export const UserPrompt = (candidateName:string,position:string,jd:string,mode: 'b64'| 'plain'):string => {
    return `
    Followings are ${mode == 'b64' ? 'Base64 encoded' : 'Plain Text'} Strings
    Candidate Name:
    ${candidateName},
    Position:
    ${position},
    Job Description:
    ${jd}
  `;
}