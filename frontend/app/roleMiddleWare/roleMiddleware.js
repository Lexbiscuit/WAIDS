// function checkAccess(req, res, next) {
//     const userRole = req.session?.user?.role;
//     const currentPage = req.path.split("/")[2]; 
//     const allowedPages = roleAccess[userRole];
  
//     if (allowedPages.includes(currentPage) || allowedPages.includes('*')) {
//       next();
//     } else {
//       switch (userRole) {
//         case 'Network Administrator':
//           res.redirect('/ids-sources'); // Redirect to IDS Sources page
//           break;
//         case 'SOC Analysts':
//           res.redirect('/logviewer'); // Redirect to Log Viewer page
//           break;
//         case 'IT managers':
//           res.redirect('/investigation'); // Redirect to Investigation page
//           break;
//         case 'IR Team':
//           res.redirect('/investigation'); // Redirect to Investigation page
//           break;
//         case 'System Administrator':
//           res.redirect('/main-dashboard'); // Redirect to Main Dashboard page
//           break;
//         default:
//           res.redirect('/login'); // Redirect to login page or any other fallback page
//       }
//     }
//   }