import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from "../../appwrite/config"

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'


function PostForm({post}) {
    // what if we have to update the post so we need props  
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
          // agar edit karna hoga toh we need some default values

            title:post?.title||'',
            slug: post?.slug|| '',
            content:post?.content||'',
            status:post?.status|| 'active',


        },
    })
    const navigate = useNavigate()
    const userData=useSelector(state=>state.userData)
    
    const submit=async(data)=>{
        if(post){
        const file =  data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
          
        
        if(file) {
          appwriteService.deletePost(post.featuredImage)
        }
        
        const dbPost=await appwriteService.updatePost(
          post.$id,{...data,featuredImage:file ? file.$id:undefined,
            
            
            
          });
        if(dbPost){
          navigate(`/post/${dbPost.id}`)
        }
        }
        else {
          const file = await appwriteService.uploadFile(data.image[0]);
          
          if(file){
            const fileId=file.$id
            data.featuredImage=fileId
          const dbPost=  await appwriteService.createPost({
              ...data,
              featuredImage: file ? file.$id : undefined,

            })

            if(dbPost){
              navigate(`/post/${dbPost.$id}`)
            }

          }

        }
       
    }
    const slugTransform=useCallback((value)=>{
      if(value && typeof value=== 'string')
      return value
    .trim()
    .toLowerCase()
    // to replace gap with anything except a-zA-Z \digits\space
    // the matching pattern is called 
    .replace(/^[a-zA-Z\d\s]+/g,"-")
    .replace(/\s/g,"-")

    return ''
    },[])

    React.useEffect(()=>{
      const subscription= watch((value,{name})=>{
        if(name==='title'){
          setValue('slug',slugTransform(value.title,
          {shouldValidate:true}))
        }
      })
      return ()=>{
        subscription.unsubscribe()
      }
    },[watch,slugTransform,setValue])
    
  return (
      

    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'
    >
      <div className='w-2/3 px-2'>
        <Input
        label="Title: "
        placeholder="Title"
        className="mb-4"
        {...register("title",{
          required:true
        })}

        />
        <Input
        label="Slug: "
        placeholder="Slug"
        className="mb-4"
        {...register("slug",{required:true})}
        // slug me values bhi update hongi 
        onInput={(e)=>{
          setValue("slug",slugTransform(e.currentTarget.value),{ shouldValidate: true});

        }}
        />
        <RTE label="Content :" name="control" control={control} defaultValue={getValues("content")}/>
        
      </div>
      <div className="w-1/3 px-2">
        <Input
        label="Featured Image :"
        type="file"
        className="mb-4"
        // to give different kinds of formats of images
        accept="image/pnb,image/jpg,image/jpeg,image/gif"
        {...register("image",{required:!post})}
        />
        {post && (
          <div className='w-full mb-4'>
            <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className='rounded-lg'
            />
            </div>
        )}
         <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>       
      </div>
    </form>


    
  )
}

export default PostForm