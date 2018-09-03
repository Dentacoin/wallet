<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Media;

class MediaController extends Controller
{
    protected function getView()   {
        return view('admin/pages/media', ['media' => $this->getMedia()]);
    }

    protected function getMedia() {
        return Media::all()->sortByDesc('created_at');
    }

    protected function openMedia() {
        echo json_encode(array('success' => view('admin/partials/media-tile', ['media' => $this->getMedia(), 'popup' => true])->render()));
        die();
    }

    protected function uploadMedia(Request $request)   {
        if(!empty($request->file('images')))    {
            $allowed = array('jpeg', 'png', 'jpg', 'JPEG', 'PNG', 'JPG');
            foreach($request->file('images') as $file)  {
                //checking for right file format
                if(!in_array(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                    return redirect()->route('media')->with(['error' => 'Images can be only with .png, .jpg or .jpeg formats.']);
                }
                //checking if error in file
                if($file->getError()) {
                    return redirect()->route('media')->with(['error' => 'There is error with one or more of the files, please try with other.']);
                }
            }

            foreach($request->file('images') as $file)  {
                $filename = $this->transliterate($file->getClientOriginalName(), true);
                $media = new Media();
                $media->name = $filename;
                //saving to DB
                $media->save();

                //moving image to UPLOADS folder
                move_uploaded_file($file->getPathName(), UPLOADS . $filename);
            }
            return redirect()->route('media')->with(['success' => 'All images have been uploaded.']);
        }
        return redirect()->route('media')->with(['error' => 'Please select one or more images to upload.']);
    }

    protected function deleteMedia($id) {
        $media = Media::where('id', $id)->first();
        if(!empty($media))  {
            //deleting image from uploads folder
            unlink(UPLOADS . $media->name);
            //deleting media from DB
            $media->delete();
            return redirect()->route('media')->with(['success' => 'Image have been deleted successfully.']);
        }else {
            return redirect()->route('media')->with(['error' => 'Wrong parameters passed.']);
        }
    }
}
