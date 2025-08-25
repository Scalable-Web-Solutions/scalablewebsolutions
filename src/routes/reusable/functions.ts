export const scrollToId = (id: string) => {
      if(window.location.pathname === '/'){
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        console.log('test')
      } else {
        console.log('test')
        window.location.href = `/#${id}`
      }
}