const CommentTImeConverter = (time) => {
    const today = new Date();
    const createdDate = new Date(time);
    const diff = today - createdDate;
    const diffYear = diff / (1000 * 60 * 60 * 24 * 30 * 12);
    const diffMonths = diff / (1000 * 60 * 60 * 24 * 30);
    const diffDays = diff / (1000 * 60 * 60 * 24);
    const diffHrs = diff / (1000 * 60 * 60);
    const diffMin = diff / (1000 * 60);
    let commentTime = '';
    if (diffMin < 1) {
      commentTime = 'now';
    } else if (diffMin > 1 && diffMin < 60) {
      commentTime = `${Math.floor(diffMin)} min ago`;
    } else if (diffMin >= 60 && diffHrs < 24) {
      commentTime = `${Math.floor(diffHrs)}h ago`;
    } else if (diffHrs >= 24 && diffDays < 30) {
      commentTime = `${Math.floor(diffDays)} days ago`;
    } else if (diffDays >= 30 && diffMonths < 12) {
      commentTime = `${Math.floor(diffMonths)} months ago`;
    } else {
      commentTime = `${Math.floor(diffYear)} months ago`;
    }
    return commentTime;
}

export default CommentTImeConverter;