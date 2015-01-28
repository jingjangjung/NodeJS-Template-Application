var app = angular.module('PETApp', ['ngResource']);

app.controller('MainCtrl', [
    '$scope','$resource',
    function($scope, $resource){
        
        var pubService = $resource('https://jsonblob.com/api/jsonBlob/5208ac13e4b002188ed03bdf/posts/:id');
        pubService.get(function(data){
            $scope.pubData = data;
        });
        
        var reachService = $resource('https://jsonblob.com/api/jsonBlob/5208a709e4b002188ed03bdd/posts/:id');
        $scope.reachData = reachService.get();
        
        $scope.addNewPost = (function(){
            
            var newPost = {
                            'content':
                            {
                                'message':$('#_new_message').val(),
                                'media':{},
                                'postType':'textmessage',
                                'network':$('#_new_network').val()
                            },
                            'tags':$('#_new_tags').val().split(','),
                            'status':'published'
                          };
            
            if( $('#_new_media').val()) {
                newPost['content']['media']['fileName'] = $('#_new_media').val();
                newPost['content']['postType'] = "photo";
            }
            
            $scope.pubData.response.push(newPost);
            
            // not really working...
            pubService.$save(newPost);
            
            $('#addPostModal').modal('hide');
            
            $('#addPostForm')[0].reset();
            
        });
        
        $(document).on('hidden.bs.modal',function(){
            $('#addPostForm')[0].reset();
        });
        
        $scope.deletePost = function ( id, xid ) {
            
            $scope.pubData.response.splice(xid, 1);
            
            var Post = pubService.get({'id':id}, function() {
                // post can't be fetched
                //  alert(JSON.stringify(post));
              Post.$delete();
            });
            
            //var post = $scope.pubData.response[xid];
            
            //API.DeletePerson({ id: xid }, function (success) {
              
            //});
        };
        
        $scope.editPost = function( id, xid ){
            
            
            $scope.updPost = $scope.pubData.response[xid];
            $scope.updPost.XID = xid;
            var updTags = $scope.pubData.response[xid]['tags'];
            $('#_upd_tags').val(updTags.replace('"',''));
            
        }
        
        $scope.updatePost = function ( ) {
            var xid = $scope.updPost.XID;
            var id = $scope.updPost.id;
            
            $scope.pubData.response[xid]['content']['message'] = $('#_upd_message').val();
            $scope.pubData.response[xid]['content']['network'] = $('#_upd_network').val();
            $scope.pubData.response[xid]['tags'] = $('#_upd_tags').val().split(',');
            
            if( $('#_upd_media').val()) {
                $scope.pubData.response[xid]['content']['media']['fileName'] = $('#_upd_media').val();
                $scope.pubData.response[xid]['content']['postType'] = "photo";
            }
            
            var Post = pubService.get({'id':id}, function() {
              Post.$save();
            });
            
            $('#editPostModal').modal('hide');
            
            $('#editPostForm')[0].reset();
            
        };
        
    }
]);