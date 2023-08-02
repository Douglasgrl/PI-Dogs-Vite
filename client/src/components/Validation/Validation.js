const regexName = /^(?!.*\d)[A-Za-z]{3,24}$/;
const regexImage = /^(?=.{1,}\.\w+$|.{1,}\:\/\/).+$/;
const RegexNumber = /^[0-9]+$/;
const regexLife = /^[0-9]+$/

const validation = (dogsData)=>{

    const errors = {}


    if(!regexName.test(dogsData.name)) errors.name = "Su nombre es invalido"

    if(!regexImage.test(dogsData.image)) errors.image = "Deberia ser una imagen"
    
    if (!RegexNumber.test(dogsData.height1) || !RegexNumber.test(dogsData.height2))
    errors.height1 = "Solo puedes colocar números";

    else if (!dogsData.height1 || !dogsData.height2)
    errors.height1 = "Debe llenar ambos campos";

    else if (Number(dogsData.height2) <= Number(dogsData.height1))
    errors.height1 = "El segundo valor debe ser mayor que el primero";

  if (!RegexNumber.test(dogsData.weight1) || !RegexNumber.test(dogsData.weight2))
    errors.weight1 = "Solo puedes colocar números";

  else if (!dogsData.weight1 || !dogsData.weight2)
    errors.weight1 = "Debe llenar ambos campos";

  else if (Number(dogsData.weight1) >= Number(dogsData.weight2))
    errors.weight1 = "El segundo valor debe ser mayor que el primero";

    if(!regexLife.test(dogsData.life_span)) errors.life_span = "Debe ser un numero"


    if(dogsData.temperament.length === 0) errors.temperament = "Debe seleccionar por lo menos 1 temperamento"
    
    return errors
}

export default validation;