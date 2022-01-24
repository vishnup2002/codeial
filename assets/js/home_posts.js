{
    var user;

    let newPostDOM = function(post){
        return (
            $(`<li id="post-${post._id}">
                    <p>
                        ${post.content}
                        <br>
                        ${user.name}
                        <br>
                       
                        <a href="/user/home/post/destroy/${post._id}" class="delete-post-button">
                            X
                        </a>
                        
                    
                        <form action="/comment/create-comment" method="post" class="comment-form">
                            <input type="text" name="content" id="" placeholder="Enter comment here.." required>
                            <input type="hidden" name="postid" value="${post._id}">
                            <input type="submit" value="Submit">
                        </form>

                        <ul id="comment-list-${post._id}">
                            
                        </ul>
                           
                            
                            
                    </p>
                </li>`)
                )
    }

    let newCommentDOM = function(comment){
                return (
                $(`<li id="comment-${comment._id}">
                        <p>${ comment.content}<br>
                        <span>${user.name}</span>
                           
                            <a href="/comment/destroy/${ comment._id }" class="delete-comment-button">
                                X
                            </a>
                            
                        </p>
                    </li>`
                )
            )
    }

    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:"/user/home/post/create-post",
                data: newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#post-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'bottomRight',
                        timeout: 1500
                        
                    }).show();

                    newPostForm.trigger("reset");
                    localStorage.setItem("flash","Post added");
                    
                    let newCommentForm = $(' .comment-form',newPost);
                    newCommentForm.each(function(){
                        $(this).submit(function(e){
                            e.preventDefault();
                                $.ajax({
                                    type:'post',
                                    url:'/comment/create-comment',
                                    data:$(this).serialize(),
                                    success:function(data){
                
                                        let comment = data.data.comment;
                                        let newComment = newCommentDOM(comment);
                                       
                                        $(`#comment-list-${comment.post}`).prepend(newComment);
                                        deleteComment($(' .delete-comment-button',newComment));

                                        new Noty({
                                            theme: 'relax',
                                            text: "Comment added",
                                            type: 'success',
                                            layout: 'bottomRight',
                                            timeout: 1500
                                            
                                        }).show();
                
                                    },error:function(error){
                                        console.log(error.responseText);
                                        return;
                                    }
                                })
                                }
                            )
                        }
                    )

                },error:function(error){
                    console.log(error.responseText);
                    return;
                }
            })

            
        })
    }

    let createComment = function(){
        let newCommentForm = $('.comment-form');
        newCommentForm.each(function(){
            $(this).submit(function(e){
                e.preventDefault();

                $.ajax({
                    type:'post',
                    url:'/comment/create-comment',
                    data:$(this).serialize(),
                    success:function(data){

                        let comment = data.data.comment;
                        let newComment = newCommentDOM(comment);
                        
                        $(`#comment-list-${comment.post}`).prepend(newComment);
                        deleteComment($(' .delete-comment-button',newComment));
                        new Noty({
                            theme: 'relax',
                            text: "Comment added",
                            type: 'success',
                            layout: 'bottomRight',
                            timeout: 1500
                            
                        }).show();

                    },error:function(error){
                        console.log(error.responseText);
                        return;
                    }

                })

                $(this).trigger("reset");

            }
            )
        }
        )
    }
    

    let deletePost = function(deleteLink){
        deleteLink.click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'bottomRight',
                        timeout: 1500
                        
                    }).show();

                },error:function(error){
                    console.log(error.responseText);
                    return;

                }

            })

        })
    }

    let deleteComment = function(deleteLink){
        deleteLink.click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment deleted",
                        type: 'success',
                        layout: 'bottomRight',
                        timeout: 1500
                        
                    }).show();

                },error:function(error){
                    console.log(error.responseText);
                    return;

                }

            })

        })
    }

    $.getJSON("/api/user_data", function(data) {
        user = data;   
    });

    $('.delete-post-button').each(function(){
        deletePost($(this));
    });
    
    $('.delete-comment-button').each(function(){
        deleteComment($(this));
    });

    createPost();
    createComment();




}



// var user;



// {
    

//     let createPost = function(){
//         let newPostForm = $('#new-post-form');

//         newPostForm.submit(function(e){
//             e.preventDefault();
            
//             $.ajax({
//                 type:'post',
//                 url:'/user/home/post/create-post',
//                 data:newPostForm.serialize(),
//                 success: function(data){
//                     console.log(data);
//                     let newPost = newPostDOM(data.data.post);

//                     $('#post-container>ul').prepend(newPost);
//                     deletePost($(' .delete-post-button', newPost));

//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
//             })

//             newPostForm.trigger("reset");
//         })

        
//     }


//     //method to create a post in DOM
//     $.getJSON("/api/user_data", function(data) {
//         user = data;   
        
//     });
//     let newPostDOM = function(post){
//         return $(`<li id="post-${post._id}">
//                     <p>
//                         ${post.content}
//                         <br>
//                         ${user.name}
//                         <br>
                       
//                             <a href="/user/home/post/destroy/${post._id}" class="delete-post-button">
//                                 X
//                             </a>
                            
                        
//                             <form action="/comment/create-comment" method="post">
//                                 <input type="text" name="content" id="" placeholder="Enter comment here.." required>
//                                 <input type="hidden" name="postid" value="${post._id}">
//                                 <input type="submit" value="Submit">
//                             </form>

//                             <ul id="comment-list-${post._id}">
                                
//                             </ul>
                           
                            
                            
//                     </p>
//                 </li>`)
//     }

//     let deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success:function(data){
//                     console.log(data);
//                     $(`#post-${data.data.post_id}`).remove();
//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
//             })
            
//         })
//         console.log(deleteLink);
//     }

//     let deleteComment = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success:function(data){
//                     console.log(data);
//                     $(`#comment-${data.data.comment_id}`).remove();
//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })

//         console.log(deleteLink);
//     }

//     let createComment = function(){
//         let newCommentForm = $('#comment-form');

//         newCommentForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/comment/create-comment',
//                 data :newCommentForm.serialize(),
//                 success:function(data){
//                     let newComment = newCommentDOM(data.data.comment);
//                     $(`#comment-list-${newComment._id}`).prepend(newComment);
//                     deleteComment($(" .delete-post-button", newComment));
//                     console.log("delete-added");

//                 },error:function(error){
//                         console.log(error.responseText);
//                     }

//             })

//             newCommentForm.trigger("reset");
//         })
//     }

//     $('.delete-post-button').each(function(index,value){
//         deletePost(this);
//     })
    
//     $('.delete-comment-button').each(function(index,value){
//         deleteComment(this);
//     })



    

//     let newCommentDOM = function(comment){
//         console.log(comment);
//         return (`<li id="comment-${comment._id}">
//                 <p>${ comment.content}<br>
//                 <span>${user.name}</span>
                   
//                     <a href="/comment/destroy/${ comment._id }" class="delete-comment-button">
//                         X
//                     </a>
                    
//                 </p>
//             </li>`
//         )
//     }

    

//     createComment();

//     createPost();



// }

