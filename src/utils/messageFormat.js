export const messageFormat = (message) => {
    const { title, description, budget, date, url, nameSite } = message;
  
    const maxDescriptionLength = 350;
    const truncatedDescription =
      description.length > maxDescriptionLength
        ? description.substring(0, maxDescriptionLength) + "..."
        : description;
  
    const descriptionWithoutLinks = truncatedDescription.replace(
      /https?:\/\/\S+/gi,
      ""
    );
  
    return `
  🚀 *Novo Projeto Encontrado!  *${nameSite}**
  
  📝 *${title}*
  
  📄 ${descriptionWithoutLinks}
  
  💰 ${budget || "A Combinar"}
  
  🗓️ *Data de Postagem:* ${date || ""}
  🔗 *Link da Postagem:* [Clique aqui](${url || ""})
    `;
  };
  