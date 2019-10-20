export const gfAdminArticle = {
  inputs: {
    name: {
      hero: {
        text: 'Name',
      },
    },
    previewName: {
      hero: {
        text: 'Preview-Name',
      },
    },
    href: {
      hero: {
        text: 'Href',
      },
    },
    file: {
      hero: {
        text: 'Preview image',
      },
    },
    category: {
      hero: {
        text: 'Category',
      },
    },
    description: {
      hero: {
        text: 'Description',
      },
      textarea: true,
    },
    previewDescription: {
      hero: {
        text: 'Preview-Description',
      },
    },
    tags: {
      hero: {
        text: 'Tags',
      },
      splitString: true,
    },
    destination: {
      hero: {
        text: 'Destination',
      },
      splitString: true,
    },
    pathname: {
      hero: {
        text: 'Pathname',
      },
      splitString: true,
    },
  },

  editLink: id => `/create-article?edit=true&id=${id}`
}