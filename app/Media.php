<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model   {
    function getLink()  {
        return UPLOADS_FRONT_END . $this->name;
    }

}
