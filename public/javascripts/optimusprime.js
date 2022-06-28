try{
    // undsen uuseh objectiin zaralj baina
    let result = {};
    
      const calculateAge = (birthday) => {
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    
    // husnegteer ireed baigaag ni boliulj neg object bolgoj baina
    let parent = parentz[0];
    // neriin onooj baina
    result.name = parent.firstName;
    // huuhduudiinh ni medeelliig oruuljiin
    if(brothers.length>0){
        result.children = brothers.map(item => ({name: item.firstName}))
        }
        var naruto = result;
        console.log(naruto);
        console.log(result);
      }
    catch(e){
      console.log(e);
    }