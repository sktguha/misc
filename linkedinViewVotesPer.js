// run on example https://www.linkedin.com/in/sktguha/detail/recent-activity/shares/
$$('.occludable-update').forEach(dv=>{
 let views = dv.getElementsByTagName('Strong')[0].innerText.split(' ')[0];
 views = parseInt(views.split(",").join(""))
 let votes = dv.querySelector('.social-details-social-counts__reactions-count');
 let ve = votes;
 votes = votes ? votes.innerText*1:0;
 let per =  parseFloat((votes/views)*100).toFixed(3) + '%';
 dv.querySelector('.feed-shared-actor__name').firstElementChild.innerText += ' '+per;
})
