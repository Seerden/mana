import { Term, TermModel } from "../../graphql/types/Term";

/** Helper functions to fix up database documents whenever I make changes to models */

/** To have saturation levels be predictable for an update to occur on review completion, 
 *      we shouldn't have null states, and also shouldn't intialize saturation levels to something like -1. 
 *  Instead, initialize terms to saturation level 0, 
 *      and distinguish between a term a user hasn't reviewed and one they're bad at recollecting using term.history.length
 */
export async function fixSaturation() {
    const terms = await TermModel.find({
        $or: [
            {'saturation.forwards': null},
            {'saturation.forwards': -1},
            {'saturation.backwards': null},
            {'saturation.backwards': -1}
        ]
    }).exec();

    const updatedTerms: Term[] = [];

    for (const term of terms) {
        if (term.saturation) {
            const { forwards, backwards } = term.saturation;
            let shouldSave: boolean = false;

            if (forwards === null || forwards === -1) {
                term.saturation.forwards = 0;
                shouldSave = true;
            }
            if (backwards === null || backwards === -1) {
                term.saturation.backwards = 0;
                shouldSave = true;
            }
    
            if (shouldSave) {
                updatedTerms.push(await term.save());
            }
        }
    };

    console.log(updatedTerms)
}

export async function deleteTermsWthoutOwner() {
    console.log(await TermModel.deleteMany({ owner: { $exists: false}}));
}