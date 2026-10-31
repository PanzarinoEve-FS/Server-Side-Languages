// 1. Converting callback-based functions to Promise-based functions

// Each function now returns a Promise 
//   - resolve(value) replaces callback(value) when the work succeeds.
//   - reject(error) signals a failure, which the chain's .catch() handles.

// The setTimeout calls stay the same to simulate a 1-second request.

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Error handling: reject IDs that aren't positive integers.
      if (!Number.isInteger(userId) || userId <= 0) {
        reject(new Error(`Invalid user ID: ${userId}`));
        return;
      }
      const user = { id: userId, name: 'User ' + userId };
      resolve(user);
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Error handling: posts can't be fetched without a user ID.
      if (!userId) {
        reject(new Error('A user ID is required to fetch posts'));
        return;
      }
      const posts = ['Post 1', 'Post 2', 'Post 3'];
      resolve(posts);
    }, 1000);
  });
}

function fetchPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Error handling: comments can't be fetched without a post ID,
      // ex: if the user had no posts and posts[0] is undefined.
      if (!postId) {
        reject(new Error('A post ID is required to fetch comments'));
        return;
      }
      const comments = ['Comment 1', 'Comment 2'];
      resolve(comments);
    }, 1000);
  });
}


// 2. Chaining Promises with .then()
// 3. Data flow through the chain

// Fetches a user, then their posts, then the comments on their first post.
// Each .then() returns the next fetch's Promise. 
// The chain waits for Promise to resolve and passes its value to the next .then() 

function getUserActivity(userId) {
  return fetchUserData(userId)
    // Step 1: receives the user, passes user.id to fetch their posts.
    .then((user) => {
      console.log('User:', user);
      return fetchUserPosts(user.id);
    })
    // Step 2: receives the posts, passes the first post to fetch its comments.
    .then((posts) => {
      console.log('Posts:', posts);
      return fetchPostComments(posts[0]);
    })
    // Step 3: receives the comments, the final result of the chain.
    .then((comments) => {
      console.log('Comments:', comments);
    })

    // 4. Error handling (bonus)

    // A single .catch() at the end handles a rejection from any step.

    // When a Promise rejects the remaining .then() are skipped 
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

// First run: succeeds and logs the user, posts and comments (about 3 seconds).
// Second run: starts only after the first finishes, and uses an invalid ID to show the error handling. 
// fetchUserData rejects, so the posts and comments are never fetched and .catch() logs the error.

getUserActivity(1)
  .then(() => {
    console.log('\nError handling: invalid user ID');
    return getUserActivity(-1);
  });
