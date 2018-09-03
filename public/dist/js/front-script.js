var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var basic = {
    options: {
        alert: null
    },
    init: function init(opt) {
        basic.options = $.extend({
            alert: function alert(message) {
                basic.showAlert(message);
            }
        }, opt);
    },
    cookies: {
        set: function set(name, value) {
            if (name == undefined) {
                name = "cookieLaw";
            }
            if (value == undefined) {
                value = 1;
            }
            var d = new Date();
            d.setTime(d.getTime() + 10 * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires + ";path=/";
            if (name == "cookieLaw") {
                $(".cookies_popup").slideUp();
            }
        },
        erase: function erase(name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        get: function get(name) {

            if (name == undefined) {
                var name = "cookieLaw";
            }
            name = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return "";
        }
    },
    fixPlaceholders: function fixPlaceholders() {
        $("input[data-placeholder]").each(function () {
            if ($(this).data("placeholders-fixed") == undefined) {
                $(this).data("placeholders-fixed", true);

                basic.setInputsPlaceholder($(this));

                $focus_function = "if($(this).val()=='" + $(this).data("placeholder") + "'){ $(this).val(''); }";
                if ($(this).attr("onkeydown") != undefined) {
                    $focus_function = $(this).attr("onkeydown") + "; " + $focus_function;
                }
                $(this).attr("onkeydown", $focus_function);

                $blur_function = "if($(this).val()==''){ $(this).val('" + $(this).data("placeholder") + "'); }";
                if ($(this).attr("onblur") != undefined) {
                    $blur_function = $(this).attr("onblur") + "; " + $blur_function;
                }
                $(this).attr("onblur", $blur_function);
            }
        });
    },
    clearPlaceholders: function clearPlaceholders(extra_filter) {
        if (extra_filter == undefined) {
            extra_filter = "";
        }
        $("input[data-placeholder]" + extra_filter).each(function () {
            if ($(this).val() == $(this).data("placeholder")) {
                $(this).val('');
            }
        });
    },
    setPlaceholders: function setPlaceholders() {
        $("input[data-placeholder]").each(function () {
            basic.setInputsPlaceholder($(this));
        });
    },
    setInputsPlaceholder: function setInputsPlaceholder(input) {
        if ($(input).val() == "") {
            $(input).val($(input).data("placeholder"));
        }
    },
    fixBodyModal: function fixBodyModal() {
        if ($(".modal-dialog").length > 0 && !$("body").hasClass('modal-open')) {
            $("body").addClass('modal-open');
        }
    },
    fixZIndexBackdrop: function fixZIndexBackdrop() {
        if (jQuery('.bootbox').length > 1) {
            var last_z = jQuery('.bootbox').eq(jQuery('.bootbox').length - 2).css("z-index");
            jQuery('.bootbox').last().css({ 'z-index': last_z + 2 }).next('.modal-backdrop').css({ 'z-index': last_z + 1 });
        }
    },
    showAlert: function showAlert(message, class_name) {
        basic.realShowDialog(message, "alert", class_name);
    },
    showConfirm: function showConfirm(message, class_name, params) {
        basic.realShowDialog(message, "confirm", class_name, params);
    },
    showDialog: function showDialog(message, class_name, type) {
        if (type === undefined) {
            type = null;
        }
        basic.realShowDialog(message, "dialog", class_name, null, type);
    },
    realShowDialog: function realShowDialog(message, dialog_type, class_name, params, type) {
        if (class_name === undefined) {
            class_name = "";
        }
        if (type === undefined) {
            type = null;
        }

        var atrs = {
            "message": message,
            "animate": false,
            "show": false,
            "className": class_name
        };

        if (dialog_type == "confirm" && params != undefined && params.buttons == undefined) {
            atrs.buttons = {
                confirm: {
                    label: 'Ð”Ð°',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'ÐÐµ',
                    className: 'btn-danger'
                }
            };
        }
        if (params != undefined) {
            for (var key in params) {
                atrs[key] = params[key];
            }
        }

        var dialog = eval("bootbox." + dialog_type)(atrs);
        dialog.on('hidden.bs.modal', function () {
            basic.fixBodyModal();
            if (type != null) {
                $('.single-application figure[data-slug="' + type + '"]').parent().focus();
            }
        });
        dialog.on('shown.bs.modal', function () {
            basic.fixZIndexBackdrop();
        });
        dialog.modal('show');
    },
    closeDialog: function closeDialog() {
        bootbox.hideAll();
    },
    request: {
        initialize: false,
        result: null,
        submit: function submit(url, data, options, callback, curtain) {
            options = $.extend({
                type: 'POST',
                dataType: 'json',
                async: true
            }, options);
            if (basic.request.initialize && options.async == false) {
                console.log(['Please wait for parent request']);
            } else {
                basic.request.initialize = true;
                return $.ajax({
                    url: url,
                    data: data,
                    type: options.type,
                    dataType: options.dataType,
                    async: options.async,
                    beforeSend: function beforeSend() {
                        if (curtain !== null) {
                            basic.addCurtain();
                        }
                    },
                    success: function success(response) {
                        basic.request.result = response;
                        if (curtain !== null) {
                            basic.removeCurtain();
                        }
                        basic.request.initialize = false;
                        if (typeof callback === 'function') {
                            callback(response);
                        }
                    },
                    error: function error() {
                        basic.request.initialize = false;
                    }
                });
            }
        },
        validate: function validate(form, callback, data) {
            //if data is passed skip clearing all placeholders and removing messages. it's done inside the calling function
            if (data == undefined) {
                basic.clearPlaceholders();
                $(".input-error-message").remove();
                data = form.serialize();
            }
            return basic.request.submit(SITE_URL + "validate/", data, { async: false }, function (res) {
                if (typeof callback === 'function') {
                    callback();
                }
            }, null);
        },
        markValidationErrors: function markValidationErrors(validation_result, form) {
            basic.setPlaceholders();
            if (typeof validation_result.all_errors == "undefined") {
                if (typeof validation_result.message != "undefined") {
                    basic.showAlert(validation_result.message);
                    return true;
                }
            } else {
                var all_errors = JSON.parse(validation_result.all_errors);
                for (var param_name in all_errors) {
                    //if there is error, but no name for it, pop it in alert
                    if (Object.keys(all_errors).length == 1 && $('[name="' + param_name + '"]').length == 0) {
                        basic.showAlert(all_errors[param_name]);
                        return false;
                    }

                    if (form == undefined) {
                        var input = $('[name="' + param_name + '"]');
                    } else {
                        var input = form.find('[name="' + param_name + '"]');
                    }
                    basic.request.removeValidationErrors(input);
                    if (input.closest('.input-error-message-holder')) {
                        input.closest('.input-error-message-holder').append('<div class="input-error-message">' + all_errors[param_name] + '</div>');
                    } else {
                        input.after('<div class="input-error-message">' + all_errors[param_name] + '</div>');
                    }
                    //basic.setInputsPlaceholder(input);
                }
            }
        },
        removeValidationErrors: function removeValidationErrors(input) {
            input.closest('.input-error-message-holder').find(".input-error-message").remove();
            input.parent().remove(".input-error-message");
        }
    },
    alert: function alert(message) {
        basic.options.alert(message);
    },
    addCurtain: function addCurtain() {
        $("body").prepend('<div class="curtain"></div>');
    },
    removeCurtain: function removeCurtain() {
        $("body .curtain").remove();
    },
    validateEmail: function validateEmail(email) {
        return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        );
    },
    isInViewport: function isInViewport(el) {
        var elementTop = $(el).offset().top;
        var elementBottom = elementTop + $(el).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
};
/*jslint browser: true, confusion: true, sloppy: true, vars: true, nomen: false, plusplus: false, indent: 2 */
/*global window,google */

/**
 * @name MarkerClustererPlus for Google Maps V3
 * @version 2.0.1 [July 27, 2011]
 * @author Gary Little
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of markers.
 * <p>
 * This is an enhanced V3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >V2 MarkerClusterer</a> by Xiaoxi Wu. It is based on the
 * <a href="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/"
 * >V3 MarkerClusterer</a> port by Luke Mahe. MarkerClustererPlus was created by Gary Little.
 * <p>
 * v2.0 release: MarkerClustererPlus v2.0 is backward compatible with MarkerClusterer v1.0. It
 *  adds support for the <code>ignoreHidden</code>, <code>title</code>, <code>printable</code>,
 *  <code>batchSizeIE</code>, and <code>calculator</code> properties as well as support for
 *  four more events. It also allows greater control over the styling of the text that appears
 *  on the cluster marker. The documentation has been significantly improved and the overall
 *  code has been simplified and polished. Very large numbers of markers can now be managed
 *  without causing Javascript timeout errors on Internet Explorer. Note that the name of the
 *  <code>clusterclick</code> event has been deprecated. The new name is <code>click</code>,
 *  so please change your application code now.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @name ClusterIconStyle
 * @class This class represents the object for values in the <code>styles</code> array passed
 *  to the {@link MarkerClusterer} constructor. The element in this array that is used to
 *  style the cluster icon is determined by calling the <code>calculator</code> function.
 *
 * @property {string} url The URL of the cluster icon image file. Required.
 * @property {number} height The height (in pixels) of the cluster icon. Required.
 * @property {number} width The width (in pixels) of the cluster icon. Required.
 * @property {Array} [anchor] The anchor position (in pixels) of the label text to be shown on
 *  the cluster icon, relative to the top left corner of the icon.
 *  The format is <code>[yoffset, xoffset]</code>. The <code>yoffset</code> must be positive
 *  and less than <code>height</code> and the <code>xoffset</code> must be positive and less
 *  than <code>width</code>. The default is to anchor the label text so that it is centered
 *  on the icon.
 * @property {string} [textColor="black"] The color of the label text shown on the
 *  cluster icon.
 * @property {number} [textSize=11] The size (in pixels) of the label text shown on the
 *  cluster icon.
 * @property {number} [textDecoration="none"] The value of the CSS <code>text-decoration</code>
 *  property for the label text shown on the cluster icon.
 * @property {number} [fontWeight="bold"] The value of the CSS <code>font-weight</code>
 *  property for the label text shown on the cluster icon.
 * @property {number} [fontStyle="normal"] The value of the CSS <code>font-style</code>
 *  property for the label text shown on the cluster icon.
 * @property {number} [fontFamily="Arial,sans-serif"] The value of the CSS <code>font-family</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [backgroundPosition="0 0"] The position of the cluster icon image
 *  within the image defined by <code>url</code>. The format is <code>"xpos ypos"</code>
 *  (the same format as for the CSS <code>background-position</code> property). You must set
 *  this property appropriately when the image defined by <code>url</code> represents a sprite
 *  containing multiple images.
 */
/**
 * @name ClusterIconInfo
 * @class This class is an object containing general information about a cluster icon. This is
 *  the object that a <code>calculator</code> function returns.
 *
 * @property {string} text The text of the label to be shown on the cluster icon.
 * @property {number} index The index plus 1 of the element in the <code>styles</code>
 *  array to be used to style the cluster icon.
 */
/**
 * A cluster icon.
 *
 * @constructor
 * @extends google.maps.OverlayView
 * @param {Cluster} cluster The cluster with which the icon is to be associated.
 * @param {Array} [styles] An array of {@link ClusterIconStyle} defining the cluster icons
 *  to use for various cluster sizes.
 * @private
 */
function ClusterIcon(cluster, styles) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.cluster_ = cluster;
    this.styles_ = styles;
    this.center_ = null;
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
}

/**
 * Adds the icon to the DOM.
 */
ClusterIcon.prototype.onAdd = function () {
    var cClusterIcon = this;

    this.div_ = document.createElement("div");
    if (this.visible_) {
        this.show();
    }

    this.getPanes().overlayMouseTarget.appendChild(this.div_);

    google.maps.event.addDomListener(this.div_, "click", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when a cluster marker is clicked.
         * @name MarkerClusterer#click
         * @param {Cluster} c The cluster that was clicked.
         * @event
         */
        google.maps.event.trigger(mc, "click", cClusterIcon.cluster_);
        google.maps.event.trigger(mc, "clusterclick", cClusterIcon.cluster_); // deprecated name

        // The default click handler follows. Disable it by setting
        // the zoomOnClick property to false.
        var mz = mc.getMaxZoom();
        if (mc.getZoomOnClick()) {
            // Zoom into the cluster.
            mc.getMap().fitBounds(cClusterIcon.cluster_.getBounds());
            // Don't zoom beyond the max zoom level
            if (mz && mc.getMap().getZoom() > mz) {
                mc.getMap().setZoom(mz + 1);
            }
        }
    });

    google.maps.event.addDomListener(this.div_, "mouseover", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when the mouse moves over a cluster marker.
         * @name MarkerClusterer#mouseover
         * @param {Cluster} c The cluster that the mouse moved over.
         * @event
         */
        google.maps.event.trigger(mc, "mouseover", cClusterIcon.cluster_);
    });

    google.maps.event.addDomListener(this.div_, "mouseout", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when the mouse moves out of a cluster marker.
         * @name MarkerClusterer#mouseout
         * @param {Cluster} c The cluster that the mouse moved out of.
         * @event
         */
        google.maps.event.trigger(mc, "mouseout", cClusterIcon.cluster_);
    });
};

/**
 * Removes the icon from the DOM.
 */
ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.hide();
        google.maps.event.clearInstanceListeners(this.div_);
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

/**
 * Draws the icon.
 */
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + "px";
        this.div_.style.left = pos.x + "px";
    }
};

/**
 * Hides the icon.
 */
ClusterIcon.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.display = "none";
    }
    this.visible_ = false;
};

/**
 * Positions and shows the icon.
 */
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        if (this.cluster_.printable_) {
            // (Would like to use "width: inherit;" below, but doesn't work with MSIE)
            this.div_.innerHTML = "<img src='" + this.url_ + "'><div style='position: absolute; top: 0px; left: 0px; width: " + this.width_ + "px;'>" + this.sums_.text + "</div>";
        } else {
            this.div_.innerHTML = this.sums_.text;
        }
        this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
        this.div_.style.display = "";
    }
    this.visible_ = true;
};

/**
 * Sets the icon styles to the appropriate element in the styles array.
 *
 * @param {ClusterIconInfo} sums The icon label text and styles index.
 */
ClusterIcon.prototype.useStyle = function (sums) {
    this.sums_ = sums;
    var index = Math.max(0, sums.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style.url;
    this.height_ = style.height;
    this.width_ = style.width;
    this.anchor_ = style.anchor;
    this.textColor_ = style.textColor || "white";
    this.textSize_ = style.textSize || 11;
    this.textDecoration_ = style.textDecoration || "none";
    this.fontWeight_ = style.fontWeight || "bold";
    this.fontStyle_ = style.fontStyle || "normal";
    this.fontFamily_ = style.fontFamily || "Arial,sans-serif";
    this.backgroundPosition_ = style.backgroundPosition || "0 0";
};

/**
 * Sets the position at which to center the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
};

/**
 * Creates the cssText style parameter based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position of the icon.
 * @return {string} The CSS style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    if (!this.cluster_.printable_) {
        style.push('background-image:url(' + this.url_ + ');');
        style.push('background-position:' + this.backgroundPosition_ + ';');
    }

    if (_typeof(this.anchor_) === 'object') {
        if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 && this.anchor_[0] < this.height_) {
            style.push('height:' + (this.height_ - this.anchor_[0]) + 'px; padding-top:' + this.anchor_[0] + 'px;');
        } else {
            style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px;');
        }
        if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
            style.push('width:' + (this.width_ - this.anchor_[1]) + 'px; padding-left:' + this.anchor_[1] + 'px;');
        } else {
            style.push('width:' + this.width_ + 'px; text-align:center;');
        }
    } else {
        style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    }

    style.push('cursor:pointer; top:' + pos.y + 'px; left:' + pos.x + 'px; color:' + this.textColor_ + '; position:absolute; font-size:' + this.textSize_ + 'px; font-family:' + this.fontFamily_ + '; font-weight:' + this.fontWeight_ + '; font-style:' + this.fontStyle_ + '; text-decoration:' + this.textDecoration_ + ';');
    return style.join("");
};

/**
 * Returns the position at which to place the DIV depending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
    return pos;
};

/**
 * Creates a single cluster that manages a group of proximate markers.
 *  Used internally, do not call this constructor directly.
 * @constructor
 * @param {MarkerClusterer} mc The <code>MarkerClusterer</code> object with which this
 *  cluster is associated.
 */
function Cluster(mc) {
    this.markerClusterer_ = mc;
    this.map_ = mc.getMap();
    this.gridSize_ = mc.getGridSize();
    this.minClusterSize_ = mc.getMinimumClusterSize();
    this.averageCenter_ = mc.getAverageCenter();
    this.printable_ = mc.getPrintable();
    this.markers_ = [];
    this.center_ = null;
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, mc.getStyles());
}

/**
 * Returns the number of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {number} The number of markers in the cluster.
 */
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};

/**
 * Returns the array of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {Array} The array of markers in the cluster.
 */
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};

/**
 * Returns the center of the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {google.maps.LatLng} The center of the cluster.
 */
Cluster.prototype.getCenter = function () {
    return this.center_;
};

/**
 * Returns the map with which the cluster is associated.
 *
 * @return {google.maps.Map} The map.
 * @ignore
 */
Cluster.prototype.getMap = function () {
    return this.map_;
};

/**
 * Returns the <code>MarkerClusterer</code> object with which the cluster is associated.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 * @ignore
 */
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};

/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 * @ignore
 */
Cluster.prototype.getBounds = function () {
    var i;
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }
    return bounds;
};

/**
 * Removes the cluster from the map.
 *
 * @ignore
 */
Cluster.prototype.remove = function () {
    this.clusterIcon_.setMap(null);
    this.markers_ = [];
    delete this.markers_;
};

/**
 * Adds a marker to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to be added.
 * @return {boolean} True if the marker was added.
 * @ignore
 */
Cluster.prototype.addMarker = function (marker) {
    var i;
    var mCount;

    if (this.isMarkerAlreadyAdded_(marker)) {
        return false;
    }

    if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
    } else {
        if (this.averageCenter_) {
            var l = this.markers_.length + 1;
            var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
            var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
            this.center_ = new google.maps.LatLng(lat, lng);
            this.calculateBounds_();
        }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    mCount = this.markers_.length;
    if (this.map_.getZoom() > this.markerClusterer_.getMaxZoom()) {
        // Zoomed in past max zoom, so show the marker.
        if (marker.getMap() !== this.map_) {
            marker.setMap(this.map_);
        }
    } else if (mCount < this.minClusterSize_) {
        // Min cluster size not reached so show the marker.
        if (marker.getMap() !== this.map_) {
            marker.setMap(this.map_);
        }
    } else if (mCount === this.minClusterSize_) {
        // Hide the markers that were showing.
        for (i = 0; i < mCount; i++) {
            this.markers_[i].setMap(null);
        }
    } else {
        marker.setMap(null);
    }

    this.updateIcon_();
    return true;
};

/**
 * Determines if a marker lies within the cluster's bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 * @ignore
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
};

/**
 * Calculates the extended bounds of the cluster with the grid.
 */
Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};

/**
 * Updates the cluster icon.
 */
Cluster.prototype.updateIcon_ = function () {
    var mCount = this.markers_.length;

    if (this.map_.getZoom() > this.markerClusterer_.getMaxZoom()) {
        this.clusterIcon_.hide();
        return;
    }

    if (mCount < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.useStyle(sums);
    this.clusterIcon_.show();
};

/**
 * Determines if a marker has already been added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker has already been added.
 */
Cluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
    var i;
    if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) !== -1;
    } else {
        for (i = 0; i < this.markers_.length; i++) {
            if (marker === this.markers_[i]) {
                return true;
            }
        }
    }
    return false;
};

/**
 * @name MarkerClustererOptions
 * @class This class represents the optional parameter passed to
 *  the {@link MarkerClusterer} constructor.
 * @property {number} [gridSize=60] The grid size of a cluster in pixels. The grid is a square.
 * @property {number} [maxZoom=null] The maximum zoom level at which clustering is enabled or
 *  <code>null</code> if clustering is to be enabled at all zoom levels.
 * @property {boolean} [zoomOnClick=true] Whether to zoom the map when a cluster marker is
 *  clicked. You may want to set this to <code>false</code> if you have installed a handler
 *  for the <code>click</code> event and it deals with zooming on its own.
 * @property {boolean} [averageCenter=false] Whether the position of a cluster marker should be
 *  the average position of all markers in the cluster. If set to <code>false</code>, the
 *  cluster marker is positioned at the location of the first marker added to the cluster.
 * @property {number} [minimumClusterSize=2] The minimum number of markers needed in a cluster
 *  before the markers are hidden and a cluster marker appears.
 * @property {boolean} [ignoreHidden=false] Whether to ignore hidden markers in clusters. You
 *  may want to set this to <code>true</code> to ensure that hidden markers are not included
 *  in the marker count that appears on a cluster marker (this count is the value of the
 *  <code>text</code> property of the result returned by the default <code>calculator</code>).
 *  If set to <code>true</code> and you change the visibility of a marker being clustered, be
 *  sure to also call <code>MarkerClusterer.repaint()</code>.
 * @property {boolean} [printable=false] Whether to make the cluster icons printable. Do not
 *  set to <code>true</code> if the <code>url</code> fields in the <code>styles</code> array
 *  refer to image sprite files.
 * @property {string} [title=""] The tooltip to display when the mouse moves over a cluster
 *  marker.
 * @property {function} [calculator=MarkerClusterer.CALCULATOR] The function used to determine
 *  the text to be displayed on a cluster marker and the index indicating which style to use
 *  for the cluster marker. The input parameters for the function are (1) the array of markers
 *  represented by a cluster marker and (2) the number of cluster icon styles. It returns a
 *  {@link ClusterIconInfo} object. The default <code>calculator</code> returns a
 *  <code>text</code> property which is the number of markers in the cluster and an
 *  <code>index</code> property which is one higher than the lowest integer such that
 *  <code>10^i</code> exceeds the number of markers in the cluster, or the size of the styles
 *  array, whichever is less. The <code>styles</code> array element used has an index of
 *  <code>index</code> minus 1. For example, the default <code>calculator</code> returns a
 *  <code>text</code> value of <code>"125"</code> and an <code>index</code> of <code>3</code>
 *  for a cluster icon representing 125 markers so the element used in the <code>styles</code>
 *  array is <code>2</code>.
 * @property {Array} [styles] An array of {@link ClusterIconStyle} elements defining the styles
 *  of the cluster markers to be used. The element to be used to style a given cluster marker
 *  is determined by the function defined by the <code>calculator</code> property.
 *  The default is an array of {@link ClusterIconStyle} elements whose properties are derived
 *  from the values for <code>imagePath</code>, <code>imageExtension</code>, and
 *  <code>imageSizes</code>.
 * @property {number} [batchSizeIE=MarkerClusterer.BATCH_SIZE_IE] When Internet Explorer is
 *  being used, markers are processed in several batches with a small delay inserted between
 *  each batch in an attempt to avoid Javascript timeout errors. Set this property to the
 *  number of markers to be processed in a single batch; select as high a number as you can
 *  without causing a timeout error in the browser. This number might need to be as low as 100
 *  if 15,000 markers are being managed, for example.
 * @property {string} [imagePath=MarkerClusterer.IMAGE_PATH]
 *  The full URL of the root name of the group of image files to use for cluster icons.
 *  The complete file name is of the form <code>imagePath</code>n.<code>imageExtension</code>
 *  where n is the image file number (1, 2, etc.).
 * @property {string} [imageExtension=MarkerClusterer.IMAGE_EXTENSION]
 *  The extension name for the cluster icon image files (e.g., <code>"png"</code> or
 *  <code>"jpg"</code>).
 * @property {Array} [imageSizes=MarkerClusterer.IMAGE_SIZES]
 *  An array of numbers containing the widths of the group of
 *  <code>imagePath</code>n.<code>imageExtension</code> image files.
 *  (The images are assumed to be square.)
 */
/**
 * Creates a MarkerClusterer object with the options specified in {@link MarkerClustererOptions}.
 * @constructor
 * @extends google.maps.OverlayView
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>} [opt_markers] The markers to be added to the cluster.
 * @param {MarkerClustererOptions} [opt_options] The optional parameters.
 */
function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);

    opt_markers = opt_markers || [];
    opt_options = opt_options || {};

    this.markers_ = [];
    this.clusters_ = [];
    this.listeners_ = [];
    this.activeMap_ = null;
    this.ready_ = false;

    this.gridSize_ = opt_options.gridSize || 60;
    this.minClusterSize_ = opt_options.minimumClusterSize || 2;
    this.maxZoom_ = opt_options.maxZoom || null;
    this.styles_ = opt_options.styles || [];
    this.title_ = opt_options.title || "";
    this.zoomOnClick_ = true;
    if (opt_options.zoomOnClick !== undefined) {
        this.zoomOnClick_ = opt_options.zoomOnClick;
    }
    this.averageCenter_ = false;
    if (opt_options.averageCenter !== undefined) {
        this.averageCenter_ = opt_options.averageCenter;
    }
    this.ignoreHidden_ = false;
    if (opt_options.ignoreHidden !== undefined) {
        this.ignoreHidden_ = opt_options.ignoreHidden;
    }
    this.printable_ = false;
    if (opt_options.printable !== undefined) {
        this.printable_ = opt_options.printable;
    }
    this.imagePath_ = opt_options.imagePath || MarkerClusterer.IMAGE_PATH;
    this.imageExtension_ = opt_options.imageExtension || MarkerClusterer.IMAGE_EXTENSION;
    this.imageSizes_ = opt_options.imageSizes || MarkerClusterer.IMAGE_SIZES;
    this.calculator_ = opt_options.calculator || MarkerClusterer.CALCULATOR;
    this.batchSizeIE_ = opt_options.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE;

    if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
        // Try to avoid IE timeout when processing a huge number of markers:
        this.batchSize_ = this.batchSizeIE_;
    } else {
        this.batchSize_ = MarkerClusterer.BATCH_SIZE;
    }

    this.setupStyles_();

    this.addMarkers(opt_markers, true);
    this.setMap(map); // Note: this causes onAdd to be called
}

/**
 * Implementation of the onAdd interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
    var cMarkerClusterer = this;

    this.activeMap_ = this.getMap();
    this.ready_ = true;

    this.repaint();

    // Add the map event listeners
    this.listeners_ = [google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
        cMarkerClusterer.resetViewport_(false);
    }), google.maps.event.addListener(this.getMap(), "idle", function () {
        cMarkerClusterer.redraw_();
    })];
};

/**
 * Implementation of the onRemove interface method.
 * Removes map event listeners and all cluster icons from the DOM.
 * All managed markers are also put back on the map.
 * @ignore
 */
MarkerClusterer.prototype.onRemove = function () {
    var i;

    // Put all the managed markers back on the map:
    for (i = 0; i < this.markers_.length; i++) {
        this.markers_[i].setMap(this.activeMap_);
    }

    // Remove all clusters:
    for (i = 0; i < this.clusters_.length; i++) {
        this.clusters_[i].remove();
    }
    this.clusters_ = [];

    // Remove map event listeners:
    for (i = 0; i < this.listeners_.length; i++) {
        google.maps.event.removeListener(this.listeners_[i]);
    }
    this.listeners_ = [];

    this.activeMap_ = null;
    this.ready_ = false;
};

/**
 * Implementation of the draw interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () {};

/**
 * Sets up the styles object.
 */
MarkerClusterer.prototype.setupStyles_ = function () {
    var i, size;
    if (this.styles_.length > 0) {
        return;
    }

    for (i = 0; i < this.imageSizes_.length; i++) {
        size = this.imageSizes_[i];
        this.styles_.push({
            url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
            height: size,
            width: size
        });
    }
};

/**
 *  Fits the map to the bounds of the markers managed by the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
    var i;
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }

    this.getMap().fitBounds(bounds);
};

/**
 * Returns the value of the <code>gridSize</code> property.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};

/**
 * Sets the value of the <code>gridSize</code> property.
 *
 * @param {number} gridSize The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (gridSize) {
    this.gridSize_ = gridSize;
};

/**
 * Returns the value of the <code>minimumClusterSize</code> property.
 *
 * @return {number} The minimum cluster size.
 */
MarkerClusterer.prototype.getMinimumClusterSize = function () {
    return this.minClusterSize_;
};

/**
 * Sets the value of the <code>minimumClusterSize</code> property.
 *
 * @param {number} minimumClusterSize The minimum cluster size.
 */
MarkerClusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
    this.minClusterSize_ = minimumClusterSize;
};

/**
 *  Returns the value of the <code>maxZoom</code> property.
 *
 *  @return {number} The maximum zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_ || this.getMap().mapTypes[this.getMap().getMapTypeId()].maxZoom;
};

/**
 *  Sets the value of the <code>maxZoom</code> property.
 *
 *  @param {number} maxZoom The maximum zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
};

/**
 *  Returns the value of the <code>styles</code> property.
 *
 *  @return {Array} The array of styles defining the cluster markers to be used.
 */
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};

/**
 *  Sets the value of the <code>styles</code> property.
 *
 *  @param {Array.<ClusterIconStyle>} styles The array of styles to use.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
};

/**
 * Returns the value of the <code>title</code> property.
 *
 * @return {string} The content of the title text.
 */
MarkerClusterer.prototype.getTitle = function () {
    return this.title_;
};

/**
 *  Sets the value of the <code>title</code> property.
 *
 *  @param {string} title The value of the title property.
 */
MarkerClusterer.prototype.setTitle = function (title) {
    this.title_ = title;
};

/**
 * Returns the value of the <code>zoomOnClick</code> property.
 *
 * @return {boolean} True if zoomOnClick property is set.
 */
MarkerClusterer.prototype.getZoomOnClick = function () {
    return this.zoomOnClick_;
};

/**
 *  Sets the value of the <code>zoomOnClick</code> property.
 *
 *  @param {boolean} zoomOnClick The value of the zoomOnClick property.
 */
MarkerClusterer.prototype.setZoomOnClick = function (zoomOnClick) {
    this.zoomOnClick_ = zoomOnClick;
};

/**
 * Returns the value of the <code>averageCenter</code> property.
 *
 * @return {boolean} True if averageCenter property is set.
 */
MarkerClusterer.prototype.getAverageCenter = function () {
    return this.averageCenter_;
};

/**
 *  Sets the value of the <code>averageCenter</code> property.
 *
 *  @param {boolean} averageCenter The value of the averageCenter property.
 */
MarkerClusterer.prototype.setAverageCenter = function (averageCenter) {
    this.averageCenter_ = averageCenter;
};

/**
 * Returns the value of the <code>ignoreHidden</code> property.
 *
 * @return {boolean} True if ignoreHidden property is set.
 */
MarkerClusterer.prototype.getIgnoreHidden = function () {
    return this.ignoreHidden_;
};

/**
 *  Sets the value of the <code>ignoreHidden</code> property.
 *
 *  @param {boolean} ignoreHidden The value of the ignoreHidden property.
 */
MarkerClusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
    this.ignoreHidden_ = ignoreHidden;
};

/**
 * Returns the value of the <code>imageExtension</code> property.
 *
 * @return {string} The value of the imageExtension property.
 */
MarkerClusterer.prototype.getImageExtension = function () {
    return this.imageExtension_;
};

/**
 *  Sets the value of the <code>imageExtension</code> property.
 *
 *  @param {string} imageExtension The value of the imageExtension property.
 */
MarkerClusterer.prototype.setImageExtension = function (imageExtension) {
    this.imageExtension_ = imageExtension;
};

/**
 * Returns the value of the <code>imagePath</code> property.
 *
 * @return {string} The value of the imagePath property.
 */
MarkerClusterer.prototype.getImagePath = function () {
    return this.imagePath_;
};

/**
 *  Sets the value of the <code>imagePath</code> property.
 *
 *  @param {string} imagePath The value of the imagePath property.
 */
MarkerClusterer.prototype.setImagePath = function (imagePath) {
    this.imagePath_ = imagePath;
};

/**
 * Returns the value of the <code>imageSizes</code> property.
 *
 * @return {Array} The value of the imageSizes property.
 */
MarkerClusterer.prototype.getImageSizes = function () {
    return this.imageSizes_;
};

/**
 *  Sets the value of the <code>imageSizes</code> property.
 *
 *  @param {Array} imageSizes The value of the imageSizes property.
 */
MarkerClusterer.prototype.setImageSizes = function (imageSizes) {
    this.imageSizes_ = imageSizes;
};

/**
 * Returns the value of the <code>calculator</code> property.
 *
 * @return {function} the value of the calculator property.
 */
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};

/**
 * Sets the value of the <code>calculator</code> property.
 *
 * @param {function(Array.<google.maps.Marker>, number)} calculator The value
 *  of the calculator property.
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
};

/**
 * Returns the value of the <code>printable</code> property.
 *
 * @return {boolean} the value of the printable property.
 */
MarkerClusterer.prototype.getPrintable = function () {
    return this.printable_;
};

/**
 * Sets the value of the <code>printable</code> property.
 *
 *  @param {boolean} printable The value of the printable property.
 */
MarkerClusterer.prototype.setPrintable = function (printable) {
    this.printable_ = printable;
};

/**
 * Returns the value of the <code>batchSizeIE</code> property.
 *
 * @return {number} the value of the batchSizeIE property.
 */
MarkerClusterer.prototype.getBatchSizeIE = function () {
    return this.batchSizeIE_;
};

/**
 * Sets the value of the <code>batchSizeIE</code> property.
 *
 *  @param {number} batchSizeIE The value of the batchSizeIE property.
 */
MarkerClusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
    this.batchSizeIE_ = batchSizeIE;
};

/**
 *  Returns the array of markers managed by the clusterer.
 *
 *  @return {Array} The array of markers managed by the clusterer.
 */
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};

/**
 *  Returns the number of markers managed by the clusterer.
 *
 *  @return {number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};

/**
 * Returns the number of clusters formed by the clusterer.
 *
 * @return {number} The number of clusters formed by the clusterer.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};

/**
 * Adds a marker to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
        this.redraw_();
    }
};

/**
 * Adds an array of markers to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    var i;
    for (i = 0; i < markers.length; i++) {
        this.pushMarkerTo_(markers[i]);
    }
    if (!opt_nodraw) {
        this.redraw_();
    }
};

/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    // If the marker is draggable add a listener so we can update the clusters on the dragend:
    if (marker.getDraggable()) {
        var cMarkerClusterer = this;
        google.maps.event.addListener(marker, "dragend", function () {
            if (cMarkerClusterer.ready_) {
                this.isAdded = false;
                cMarkerClusterer.repaint();
            }
        });
    }
    marker.isAdded = false;
    this.markers_.push(marker);
};

/**
 * Removes a marker from the cluster.  The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if the
 *  marker was removed from the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if the marker was removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
        this.repaint();
    }

    return removed;
};

/**
 * Removes an array of markers from the cluster. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if markers
 *  were removed from the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if markers were removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    var i, r;
    var removed = false;

    for (i = 0; i < markers.length; i++) {
        r = this.removeMarker_(markers[i]);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this.repaint();
    }

    return removed;
};

/**
 * Removes a marker and returns true if removed, false if not.
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var i;
    var index = -1;
    if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
    } else {
        for (i = 0; i < this.markers_.length; i++) {
            if (marker === this.markers_[i]) {
                index = i;
                break;
            }
        }
    }

    if (index === -1) {
        // Marker is not in our list of markers, so do nothing:
        return false;
    }

    marker.setMap(null);
    this.markers_.splice(index, 1); // Remove the marker from the list of managed markers
    return true;
};

/**
 * Removes all clusters and markers from the map and also removes all markers
 *  managed by the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport_(true);
    this.markers_ = [];
};

/**
 * Recalculates and redraws all the marker clusters from scratch.
 *  Call this after changing any properties.
 */
MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_ = [];
    this.resetViewport_(false);
    this.redraw_();

    // Remove the old clusters.
    // Do it in a timeout to prevent blinking effect.
    setTimeout(function () {
        var i;
        for (i = 0; i < oldClusters.length; i++) {
            oldClusters[i].remove();
        }
    }, 0);
};

/**
 * Returns the current bounds extended by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 * @ignore
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
};

/**
 * Redraws all the clusters.
 */
MarkerClusterer.prototype.redraw_ = function () {
    this.createClusters_(0);
};

/**
 * Removes all clusters from the map. The markers are also removed from the map
 *  if <code>opt_hide</code> is set to <code>true</code>.
 *
 * @param {boolean} [opt_hide] Set to <code>true</code> to also remove the markers
 *  from the map.
 */
MarkerClusterer.prototype.resetViewport_ = function (opt_hide) {
    var i, marker;
    // Remove all the clusters
    for (i = 0; i < this.clusters_.length; i++) {
        this.clusters_[i].remove();
    }
    this.clusters_ = [];

    // Reset the markers to not be added and to be removed from the map.
    for (i = 0; i < this.markers_.length; i++) {
        marker = this.markers_[i];
        marker.isAdded = false;
        if (opt_hide) {
            marker.setMap(null);
        }
    }
};

/**
 * Calculates the distance between two latlng locations in km.
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};

/**
 * Determines if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
};

/**
 * Adds a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var i, d, cluster, center;
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    for (i = 0; i < this.clusters_.length; i++) {
        cluster = this.clusters_[i];
        center = cluster.getCenter();
        if (center) {
            d = this.distanceBetweenPoints_(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
    }
};

/**
 * Creates the clusters. This is done in batches to avoid timeout errors
 *  in some browsers when there is a huge number of markers.
 *
 * @param {number} iFirst The index of the first marker in the batch of
 *  markers to be added to clusters.
 */
MarkerClusterer.prototype.createClusters_ = function (iFirst) {
    var i, marker;
    var cMarkerClusterer = this;
    if (!this.ready_) {
        return;
    }

    // Cancel previous batch processing if we're working on the first batch:
    if (iFirst === 0) {
        /**
         * This event is fired when the <code>MarkerClusterer</code> begins
         *  clustering markers.
         * @name MarkerClusterer#clusteringbegin
         * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
         * @event
         */
        google.maps.event.trigger(this, "clusteringbegin", this);

        if (typeof this.timerRefStatic !== "undefined") {
            clearTimeout(this.timerRefStatic);
            delete this.timerRefStatic;
        }
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);

    var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);

    for (i = iFirst; i < iLast; i++) {
        marker = this.markers_[i];
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
            if (!this.ignoreHidden_ || this.ignoreHidden_ && marker.getVisible()) {
                this.addToClosestCluster_(marker);
            }
        }
    }

    if (iLast < this.markers_.length) {
        this.timerRefStatic = setTimeout(function () {
            cMarkerClusterer.createClusters_(iLast);
        }, 0);
    } else {
        delete this.timerRefStatic;

        /**
         * This event is fired when the <code>MarkerClusterer</code> stops
         *  clustering markers.
         * @name MarkerClusterer#clusteringend
         * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
         * @event
         */
        google.maps.event.trigger(this, "clusteringend", this);
    }
};

/**
 * Extends an object's prototype by another's.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return function (object) {
        var property;
        for (property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }.apply(obj1, [obj2]);
};

/**
 * The default function for determining the label text and style
 * for a cluster icon.
 *
 * @param {Array.<google.maps.Marker>} markers The array of represented by the cluster.
 * @param {number} numStyles The number of marker styles available.
 * @return {ClusterIconInfo} The information resource for the cluster.
 * @constant
 * @ignore
 */
MarkerClusterer.CALCULATOR = function (markers, numStyles) {
    var index = 0;
    var count = markers.length.toString();

    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }

    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index
    };
};

/**
 * The number of markers to process in one batch.
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE = 2000;

/**
 * The number of markers to process in one batch (IE only).
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE_IE = 500;

/**
 * The default root name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_PATH = HOME_URL + "/assets/images/m";

/**
 * The default extension name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_EXTENSION = "png";

/**
 * The default array of sizes for the marker cluster images.
 *
 * @type {Array.<number>}
 * @constant
 */
MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];
var markerCluster;
function initMap(filter) {
    if (filter === undefined) {
        filter = null;
    }

    Gmap = jQuery('.map-canvas');
    Gmap.each(function () {
        var $this = jQuery(this),
            lat = '',
            lng = '',
            zoom = 1,
            scrollwheel = true,
            zoomcontrol = true,
            draggable = true,
            mapType = google.maps.MapTypeId.ROADMAP,
            title = '',
            dataLat = 28.508742,
            dataLng = -0.120850,
            dataType = 'roadmap',
            dataScrollwheel = scrollwheel,
            dataZoomcontrol = $this.data('zoomcontrol'),
            dataTitle = $this.data('title');

        if (isMobile) {
            var dataZoom = 2;
        } else {
            var dataZoom = 0;
        }

        if (dataZoom !== undefined && dataZoom !== false) {
            zoom = parseFloat(dataZoom);
        }
        if (dataScrollwheel !== undefined && dataScrollwheel !== null) {
            scrollwheel = dataScrollwheel;
        }
        if (dataZoomcontrol !== undefined && dataZoomcontrol !== null) {
            zoomcontrol = dataZoomcontrol;
        }
        if (dataType !== undefined && dataType !== false) {
            if (dataType == 'satellite') {
                mapType = google.maps.MapTypeId.SATELLITE;
            } else if (dataType == 'hybrid') {
                mapType = google.maps.MapTypeId.HYBRID;
            } else if (dataType == 'terrain') {
                mapType = google.maps.MapTypeId.TERRAIN;
            }
        }
        if (dataTitle !== undefined && dataTitle !== false) {
            title = dataTitle;
        }
        if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
            draggable = true;
        }

        var styles = [{
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "hue": "#000000"
            }, {
                "saturation": -100
            }, {
                "lightness": -100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "hue": "#000000"
            }, {
                "saturation": -100
            }, {
                "lightness": -100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
                "hue": "#000000"
            }, {
                "saturation": 0
            }, {
                "lightness": -100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": -100
            }, {
                "lightness": 100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "hue": "#000000"
            }, {
                "saturation": -100
            }, {
                "lightness": -100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": -100
            }, {
                "lightness": 100
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": -100
            }, {
                "lightness": 100
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [{
                "hue": "#000000"
            }, {
                "saturation": 0
            }, {
                "lightness": -100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{
                "hue": "#000000"
            }, {
                "saturation": -100
            }, {
                "lightness": -100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#bbbbbb"
            }, {
                "saturation": -100
            }, {
                "lightness": 26
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#dddddd"
            }, {
                "saturation": -100
            }, {
                "lightness": -3
            }, {
                "visibility": "on"
            }]
        }];

        var mapOptions = {
            zoom: zoom, /*
                        scrollwheel: scrollwheel,*/
            zoomControl: zoomcontrol,
            draggable: draggable,
            center: new google.maps.LatLng(dataLat, dataLng),
            mapTypeId: mapType,
            styles: styles,
            minZoom: 1
        };

        var map = new google.maps.Map($this[0], mapOptions);

        markerCluster = new MarkerClusterer(map);
        var infowindow;
        var markers_arr = [];

        if (map_locations.length > 1) {
            for (var i = 0, len = map_locations.length; i < len; i += 1) {
                if (filter != null && map_locations[i].location_type_id != $('.partner-network-container .filter select option:selected').val()) {
                    continue;
                }
                var marker_options = {
                    position: new google.maps.LatLng(map_locations[i].lat, map_locations[i].lng),
                    lat: map_locations[i].lat,
                    lng: map_locations[i].lng,
                    map: map,
                    icon: map_locations[i].marker_icon,
                    clinic_name: map_locations[i].clinic_name
                };
                if (map_locations[i].clinic_media != undefined) {
                    marker_options.clinic_media = map_locations[i].clinic_media;
                }
                if (map_locations[i].clinic_media_alt != undefined) {
                    marker_options.clinic_media_alt = map_locations[i].clinic_media_alt;
                }
                if (map_locations[i].clinic_link != undefined) {
                    marker_options.clinic_link = map_locations[i].clinic_link;
                }
                markers_arr[i] = new google.maps.Marker(marker_options);

                google.maps.event.addListener(markers_arr[i], 'click', function () {
                    map.panTo(this.getPosition());
                    map.setZoom(18);

                    if (infowindow != null) {
                        infowindow.close();
                    }

                    var content = '<div>';
                    if (this.clinic_media != undefined) {
                        content += '<figure style="padding-bottom: 10px;"><img src="' + this.clinic_media + '" ';
                        if (this.clinic_media_alt != undefined) {
                            content += ' alt="' + this.clinic_media_alt + '"';
                        }
                        content += ' width="100"/></figure>';
                    }
                    content += '<strong>Name: </strong>' + this.clinic_name + '</div><div><strong>Address: </strong>' + this.address + '</div>';
                    if (this.clinic_link != '') {
                        content += '<div><strong>Website: </strong><a href="' + this.clinic_link + '" target="_blank">' + this.clinic_link + '</a></div>';
                    }

                    infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    infowindow.open(map, this);
                });
                markerCluster.addMarker(markers_arr[i]);
            }
        }
        map.setOptions({ minZoom: 2.2, maxZoom: 20 });
    });
}
var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

var intervals_arr = [];
var stoppers = [];
var draw_line_interval = 10;
var draw_line_increment = 10;
var border_width = 2;

$(document).ready(function () {});

$(window).on('beforeunload', function () {
    //HOMEPAGE
    if ($('.homepage-container').length > 0 && !isMobile) {
        $(window).scrollTop(0);
    }
});

$('body').bind('wheel', onMousewheel);

$(window).on("load", function () {});

$(window).on('resize', function () {
    //HOMEPAGE
    if ($('.homepage-container').length > 0 && !isMobile) {
        setLinesDots(true);
    }
    //TESTIMONIALS
    if ($('.testimonials-container').length > 0) {
        testimonialAvatarsLine();
    }
});

$(window).on('scroll', function () {
    checkIfLineIsReadyToBeCreated('second', 'vertical', ['third', 'fourth'], ['horizontal', 'vertical'], 'load-successful-practices-gif');
    checkIfLineIsReadyToBeCreated('fifth', 'vertical', [], [], 'call-sixth-and-animation');
    checkIfLineIsReadyToBeCreated('eighth', 'horizontal', ['ninth'], ['vertical']);
    checkIfLineIsReadyToBeCreated('tenth', 'horizontal', ['eleventh'], ['vertical'], 'load-buy-dentacoin-gif');
    checkIfLineIsReadyToBeCreated('twelfth', 'vertical');
    checkIfLineIsReadyToBeCreated('thirteenth', 'horizontal', ['fourteenth'], ['vertical'], 'fade-in-transaction-with-dcn');
    checkIfLineIsReadyToBeCreated('fifteenth', 'horizontal', ['sixteenth'], ['vertical']);
    checkIfLineIsReadyToBeCreated('seventeenth', 'horizontal', ['eighteenth'], ['vertical'], 'load-roadmap-gif');
    checkIfLineIsReadyToBeCreated('nineteenth', 'vertical');
    checkIfLineIsReadyToBeCreated('twentieth', 'horizontal');
});

//$(window).on('wheel', onMousewheel);

function onMousewheel(event) {
    if ($('.homepage-container').length > 0 && !isMobile && !$('body').hasClass('modal-open')) {
        if (event.originalEvent.deltaY < 0) {
            //scroll up
            if ($('body').attr('data-current') == 'two') {
                scrollToSectionAnimation('one', null, null, true);
            } else if ($(window).scrollTop() < $('.fullpage-section.two').offset().top + $('.fullpage-section.two').outerHeight() && $('body').attr('data-current') == 'rest-data') {
                scrollToSectionAnimation('two', null, true);
            }
        } else {
            //scroll down
            if ($('body').attr('data-current') == 'one') {
                scrollToSectionAnimation('two', null, true);
            } else if ($('body').attr('data-current') == 'two') {
                scrollToSectionAnimation('rest-data', true);
            }
        }
    }
}

function scrollToSectionAnimation(to_become_current, full_height, clear_dots, draw_first) {
    //doing this check, because IE 11 not support ES6
    if (full_height === undefined) {
        full_height = null;
    }
    if (clear_dots === undefined) {
        clear_dots = null;
    }

    var scroll_obj = {};
    if (full_height != null) {
        scroll_obj.scrollTop = $('.' + to_become_current).offset().top;
    } else {
        scroll_obj.scrollTop = $('.fullpage-section.' + to_become_current).offset().top;
    }
    $('body').unbind('wheel', onMousewheel);
    //$(window).unbind('wheel', onMousewheel);
    $('html, body').stop().animate(scroll_obj, 500).promise().then(function () {
        $('body').bind('wheel', onMousewheel);
        if (clear_dots != null) {
            refreshingMainDots();
        } else if (draw_first != null) {
            drawLine('first', 'vertical');
        }
    });
    $('body').attr('data-current', to_become_current);
}

function setLinesDots(resize) {
    //doing this check, because IE 11 not support ES6
    if (resize === undefined) {
        resize = null;
    }
    //init starting dots for all lines

    //FIRST LINE
    $('line.first').attr('x1', $('.intro .first-dot').offset().left);
    $('line.first').attr('x1', $('.intro .first-dot').offset().left);
    //$('line.first').attr('y1', $('.intro .first-dot').offset().top);
    $('line.first').attr('x2', $('.intro .second-dot').offset().left);
    $('line.first').attr('max-y2', $('.intro .second-dot').offset().top + $('.intro .second-dot').height());

    //SECOND LINE
    $('line.second').attr('x1', $('.successful-practices .first-dot').offset().left);
    $('line.second').attr('y1', $('.successful-practices .first-dot').offset().top);
    $('line.second').attr('x2', $('.successful-practices .second-dot').offset().left);
    $('line.second').attr('max-y2', $('.successful-practices .second-dot').offset().top);

    //THIRD LINE
    $('line.third').attr('x1', $('.successful-practices .second-dot').offset().left);
    $('line.third').attr('y1', $('.successful-practices .second-dot').offset().top);
    $('line.third').attr('y2', $('.successful-practices .third-dot').offset().top);
    $('line.third').attr('max-x2', $('.successful-practices .third-dot').offset().left);

    //FOURTH LINE
    $('line.fourth').attr('x1', $('.successful-practices .third-dot').offset().left);
    $('line.fourth').attr('y1', $('.successful-practices .third-dot').offset().top);
    $('line.fourth').attr('x2', $('.successful-practices .fourth-dot').offset().left);
    $('line.fourth').attr('max-y2', $('.successful-practices .fourth-dot').offset().top + $('.successful-practices .fourth-dot').height());

    //FIFTH LINE
    $('line.fifth').attr('x1', $('.successful-practices .fifth-dot').offset().left + border_width);
    $('line.fifth').attr('y1', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height());
    $('line.fifth').attr('x2', $('.below-successful-practices .first-dot').offset().left - $('.below-successful-practices .first-dot').width() + border_width);
    $('line.fifth').attr('max-y2', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);

    //SIXTH LINE
    $('line.sixth').attr('x1', $('.below-successful-practices .first-dot').offset().left - border_width);
    $('line.sixth').attr('y1', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);
    $('line.sixth').attr('y2', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2);
    $('line.sixth').attr('max-x2', $('.below-successful-practices .second-dot').offset().left + $('.below-successful-practices .second-dot').width());

    //SEVENTH LINE
    $('line.seventh').attr('x1', $('.below-successful-practices .second-dot').offset().left + $('.below-successful-practices .second-dot').width());
    $('line.seventh').attr('y1', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2);
    $('line.seventh').attr('x2', $('.testimonials .first-dot').offset().left + $('.below-successful-practices .second-dot').width());
    $('line.seventh').attr('max-y2', $('.testimonials .first-dot').offset().top + $('.testimonials .first-dot').height() / 2);

    //EIGHTH LINE
    $('line.eighth').attr('x1', $('.testimonials .first-dot').offset().left + $('.testimonials .first-dot').width());
    $('line.eighth').attr('y1', $('.testimonials .first-dot').offset().top + $('.testimonials .first-dot').height() / 2);
    $('line.eighth').attr('y2', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2);
    $('line.eighth').attr('max-x2', $('.testimonials .second-dot').offset().left);

    //NINTH LINE
    $('line.ninth').attr('x1', $('.testimonials .second-dot').offset().left);
    $('line.ninth').attr('y1', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2);
    $('line.ninth').attr('x2', $('.testimonials .third-dot').offset().left);
    $('line.ninth').attr('max-y2', $('.testimonials .third-dot').offset().top + $('.testimonials .third-dot').height());

    //TENTH LINE
    $('line.tenth').attr('x1', $('.testimonials .third-dot').offset().left);
    $('line.tenth').attr('y1', $('.testimonials .third-dot').offset().top + $('.testimonials .third-dot').height());
    $('line.tenth').attr('y2', $('.buy-dentacoin .first-dot').offset().top);
    $('line.tenth').attr('max-x2', $('.buy-dentacoin .first-dot').offset().left + $('.buy-dentacoin .first-dot').width());

    //ELEVENTH LINE
    $('line.eleventh').attr('x1', $('.buy-dentacoin .first-dot').offset().left + $('.buy-dentacoin .first-dot').width());
    $('line.eleventh').attr('y1', $('.buy-dentacoin .first-dot').offset().top);
    $('line.eleventh').attr('x2', $('.buy-dentacoin .second-dot').offset().left + $('.buy-dentacoin .second-dot').width());
    $('line.eleventh').attr('max-y2', $('.buy-dentacoin .second-dot').offset().top + $('.buy-dentacoin .second-dot').height());

    //TWELFTH LINE
    $('line.twelfth').attr('x1', $('.buy-dentacoin .third-dot').offset().left + border_width / border_width);
    $('line.twelfth').attr('y1', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height() - border_width / border_width);
    $('line.twelfth').attr('x2', $('.buy-dentacoin .fourth-dot').offset().left + border_width / border_width);
    $('line.twelfth').attr('max-y2', $('.buy-dentacoin .fourth-dot').offset().top + $('.buy-dentacoin .fourth-dot').height());

    //THIRTEENTH LINE
    $('line.thirteenth').attr('x1', $('.buy-dentacoin .fourth-dot').offset().left);
    $('line.thirteenth').attr('y1', $('.buy-dentacoin .fourth-dot').offset().top + $('.buy-dentacoin .fourth-dot').height());
    $('line.thirteenth').attr('y2', $('.buy-dentacoin .fifth-dot').offset().top + $('.buy-dentacoin .fifth-dot').height() / 2);
    $('line.thirteenth').attr('max-x2', $('.buy-dentacoin .fifth-dot').offset().left);

    //FOURTEENTH LINE
    $('line.fourteenth').attr('x1', $('.buy-dentacoin .fifth-dot').offset().left);
    $('line.fourteenth').attr('y1', $('.buy-dentacoin .fifth-dot').offset().top);
    $('line.fourteenth').attr('x2', $('.below-buy-dentacoin .first-dot').offset().left);
    $('line.fourteenth').attr('max-y2', $('.below-buy-dentacoin .first-dot').offset().top + $('.below-buy-dentacoin .first-dot').height());

    //FIFTEENTH LINE
    $('line.fifteenth').attr('x1', $('.below-buy-dentacoin .first-dot').offset().left);
    $('line.fifteenth').attr('y1', $('.below-buy-dentacoin .first-dot').offset().top + $('.below-buy-dentacoin .first-dot').height());
    $('line.fifteenth').attr('y2', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height());
    $('line.fifteenth').attr('max-x2', $('.below-buy-dentacoin .second-dot').offset().left + $('.below-buy-dentacoin .second-dot').width());

    //SIXTEENTH LINE
    $('line.sixteenth').attr('x1', $('.below-buy-dentacoin .second-dot').offset().left + $('.below-buy-dentacoin .second-dot').width());
    $('line.sixteenth').attr('y1', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height());
    $('line.sixteenth').attr('x2', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width());
    $('line.sixteenth').attr('max-y2', $('.awards-and-publications .first-dot').offset().top + $('.awards-and-publications .first-dot').height());

    //SEVENTEENTH LINE
    $('line.seventeenth').attr('x1', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width());
    $('line.seventeenth').attr('y1', $('.awards-and-publications .first-dot').offset().top + $('.awards-and-publications .first-dot').height());
    $('line.seventeenth').attr('y2', $('.roadmap .first-dot').offset().top);
    $('line.seventeenth').attr('max-x2', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width());

    //EIGHTEENTH LINE
    $('line.eighteenth').attr('y1', $('.roadmap .first-dot').offset().top);
    $('line.eighteenth').attr('max-y2', $('.roadmap .second-dot').offset().top + $('.roadmap .second-dot').height());
    $('body').addClass('overflow-hidden');
    if ($(window).width() < 1600) {
        $('body').removeClass('overflow-hidden');
        $('line.eighteenth').attr('x1', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width());
        $('line.eighteenth').attr('x2', $('.roadmap .second-dot').offset().left + $('.roadmap .second-dot').width());
    } else {
        $('body').removeClass('overflow-hidden');
        $('line.eighteenth').attr('x1', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width() + 1);
        $('line.eighteenth').attr('x2', $('.roadmap .second-dot').offset().left + $('.roadmap .second-dot').width() + 1);
    }

    //NINETEENTH LINE
    $('line.nineteenth').attr('x1', $('.roadmap-timeline .first-dot').offset().left + $('.roadmap-timeline .first-dot').width());
    $('line.nineteenth').attr('y1', $('.roadmap-timeline .first-dot').offset().top + $('.roadmap-timeline .first-dot').height());
    $('line.nineteenth').attr('x2', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width());
    $('line.nineteenth').attr('max-y2', $('.below-roadmap-timeline .first-dot').offset().top + $('.below-roadmap-timeline .first-dot').height() / 2);

    //TWENTIETH LINE
    $('line.twentieth').attr('x1', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width());
    $('line.twentieth').attr('y1', $('.below-roadmap-timeline .first-dot').offset().top + $('.below-roadmap-timeline .first-dot').height() / 2);
    $('line.twentieth').attr('y2', $('.below-roadmap-timeline .second-dot').offset().top + $('.below-roadmap-timeline .second-dot').height() / 2);
    $('line.twentieth').attr('max-x2', $('.below-roadmap-timeline .second-dot').offset().left);

    //MUST SET ATTR WHEN LINE IS EXECUTED AND CHECK FOR IT ALSO
    if (resize) {
        $('line.first').attr('y2', $('.intro .second-dot').offset().top + $('.intro .second-dot').height());
        $('line.second').attr('y2', $('.successful-practices .second-dot').offset().top);
        $('line.third').attr('x2', $('.successful-practices .third-dot').offset().left);
        $('line.fourth').attr('y2', $('.successful-practices .fourth-dot').offset().top + $('.successful-practices .fourth-dot').height());
        $('line.fifth').attr('y2', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);
        $('line.sixth').attr('x2', $('.below-successful-practices .second-dot').offset().left + $('.below-successful-practices .second-dot').width());
        $('line.seventh').attr('y2', $('.testimonials .first-dot').offset().top + $('.testimonials .first-dot').height() / 2);
        $('line.eighth').attr('x2', $('.testimonials .second-dot').offset().left);
        $('line.ninth').attr('y2', $('.testimonials .third-dot').offset().top + $('.testimonials .third-dot').height());
        $('line.tenth').attr('x2', $('.buy-dentacoin .first-dot').offset().left + $('.buy-dentacoin .first-dot').width());
        $('line.eleventh').attr('y2', $('.buy-dentacoin .second-dot').offset().top + $('.buy-dentacoin .second-dot').height());
        $('line.twelfth').attr('y2', $('.buy-dentacoin .fourth-dot').offset().top + $('.buy-dentacoin .fourth-dot').height());
        $('line.thirteenth').attr('x2', $('.buy-dentacoin .fifth-dot').offset().left);
        $('line.fourteenth').attr('y2', $('.below-buy-dentacoin .first-dot').offset().top + $('.below-buy-dentacoin .first-dot').height());
        $('line.fifteenth').attr('x2', $('.below-buy-dentacoin .second-dot').offset().left + $('.below-buy-dentacoin .second-dot').width());
        $('line.sixteenth').attr('y2', $('.awards-and-publications .first-dot').offset().top + $('.awards-and-publications .first-dot').height());
        $('line.seventeenth').attr('x2', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width());
        $('line.eighteenth').attr('y2', $('.roadmap .second-dot').offset().top + $('.roadmap .second-dot').height());
        $('line.nineteenth').attr('y2', $('.below-roadmap-timeline .first-dot').offset().top + $('.below-roadmap-timeline .first-dot').height() / 2);
        $('line.twentieth').attr('x2', $('.below-roadmap-timeline .second-dot').offset().left);
    } else {
        //SETTING UP FRESH ATTRIBUTES ALSO FOR REFRESHING THE MAIN DOTS AT THEIR STARTING POSITION
        $('line.first') /*.attr('y2', $('.intro .first-dot').offset().top)*/.attr('fresh-y2', 0);
        $('line.second').attr('y2', $('.successful-practices .first-dot').offset().top).attr('fresh-y2', $('.successful-practices .first-dot').offset().top);
        $('line.third').attr('x2', $('.successful-practices .second-dot').offset().left).attr('fresh-x2', $('.successful-practices .second-dot').offset().left);
        $('line.fourth').attr('y2', $('.successful-practices .third-dot').offset().top).attr('fresh-y2', $('.successful-practices .third-dot').offset().top);
        $('line.fifth').attr('y2', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height()).attr('fresh-y2', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height());
        $('line.sixth').attr('x2', $('.below-successful-practices .first-dot').offset().left - border_width).attr('fresh-x2', $('.below-successful-practices .first-dot').offset().left - border_width);
        $('line.seventh').attr('y2', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2).attr('fresh-y2', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2);
        $('line.eighth').attr('x2', $('.testimonials .first-dot').offset().left + $('.testimonials .first-dot').width()).attr('fresh-x2', $('.testimonials .first-dot').offset().left + $('.testimonials .first-dot').width());
        $('line.ninth').attr('y2', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2).attr('fresh-y2', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2);
        $('line.tenth').attr('x2', $('.testimonials .third-dot').offset().left).attr('fresh-x2', $('.testimonials .third-dot').offset().left);
        $('line.eleventh').attr('y2', $('.buy-dentacoin .first-dot').offset().top).attr('fresh-y2', $('.buy-dentacoin .first-dot').offset().top);
        $('line.twelfth').attr('y2', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height() - 1).attr('fresh-y2', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height() - 1);
        $('line.thirteenth').attr('x2', $('.buy-dentacoin .fourth-dot').offset().left).attr('fresh-x2', $('.buy-dentacoin .fourth-dot').offset().left);
        $('line.fourteenth').attr('y2', $('.buy-dentacoin .fifth-dot').offset().top).attr('fresh-y2', $('.buy-dentacoin .fifth-dot').offset().top);
        $('line.fifteenth').attr('x2', $('.below-buy-dentacoin .first-dot').offset().left).attr('fresh-x2', $('.below-buy-dentacoin .first-dot').offset().left);
        $('line.sixteenth').attr('y2', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height()).attr('fresh-y2', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height());
        $('line.seventeenth').attr('x2', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width()).attr('fresh-x2', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width());
        $('line.eighteenth').attr('y2', $('.roadmap .first-dot').offset().top).attr('fresh-y2', $('.roadmap .first-dot').offset().top);
        $('line.nineteenth').attr('y2', $('.roadmap-timeline .first-dot').offset().top + $('.roadmap-timeline .first-dot').height()).attr('fresh-y2', $('.roadmap-timeline .first-dot').offset().top + $('.roadmap-timeline .first-dot').height());
        $('line.twentieth').attr('x2', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width()).attr('fresh-x2', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width());
    }
}

function refreshingMainDots() {
    stoppers = [];
    //refresh dots
    for (var i = 0, len = $('svg.svg-with-lines line').length; i < len; i += 1) {
        if ($('svg.svg-with-lines line').eq(i).attr('fresh-x2') != undefined) {
            $('svg.svg-with-lines line').eq(i).attr('x2', $('svg.svg-with-lines line').eq(i).attr('fresh-x2'));
        } else if ($('svg.svg-with-lines line').eq(i).attr('fresh-y2') != undefined) {
            $('svg.svg-with-lines line').eq(i).attr('y2', $('svg.svg-with-lines line').eq(i).attr('fresh-y2'));
        }
    }

    //clear intervals
    for (var item in intervals_arr) {
        clearInterval(intervals_arr[item]);
    }
    intervals_arr = [];

    //bring back gifs to their starting position
    $('img.refresh-image').removeClass('active');

    //bring back gifs texts to their starting position
    $('.between-sections-description').addClass('visibility-hidden').removeClass('fade-in-animation');
    $('.below-successful-practices .description-over-line .description .wrapper').addClass('visibility-hidden').removeClass('fade-in-animation');
    for (var i = 0, len = $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').length; i < len; i += 1) {
        $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').eq(i).removeClass('fade-in-animation-' + (i + 1));
    }
}

function checkIfLineIsReadyToBeCreated(el, position, tail, tail_position, action) {
    //HOMEPAGE
    if ($('.homepage-container').length > 0 && !isMobile) {
        //doing this check, because IE 11 not support ES6
        if (action === undefined) {
            action = null;
        }
        //checking if element offset top passed the viewport middle vertically and if it has been executed before
        //if($(window).height() / 2 + $(window).scrollTop() > $('line.' + el).offset().top) {
        //CHANGED $('line.' + el).offset().top to $('line.' + el).attr('y1') because offset() not working in Safari
        if ($(window).height() / 2 + $(window).scrollTop() > $('line.' + el).attr('y1')) {
            //checking if it's not the first line and if the line before the current one is executed
            if ($('line.' + el).index() - 1 > -1 /* && $('line').eq($('line.' + el).index() - 1).attr('executed') == 'true'*/) {
                    drawLine(el, position, tail, tail_position, action);
                }
        }
    }
}

//function for drawing single line, tail and tail_position are arrays with tail lines and are used to draw group of lines, action is an event executed when the line or the group of lines execution is done
function drawLine(el, position, tail, tail_position, action) {
    //doing this check, because IE 11 not support ES6
    if (tail === undefined) {
        tail = null;
    }
    if (tail_position === undefined) {
        tail_position = null;
    }
    if (action === undefined) {
        action = null;
    }

    if ($.inArray(el, stoppers) == -1) {
        var verticalTimer = function verticalTimer() {
            if (parseFloat($('line.' + el).attr('y2')) + draw_line_increment < parseFloat($('line.' + el).attr('max-y2'))) {
                $('line.' + el).attr('y2', parseFloat($('line.' + el).attr('y2')) + draw_line_increment);
            } else {
                $('line.' + el).attr('y2', $('line.' + el).attr('max-y2')) /*.attr('executed', 'true')*/;
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        };

        var horizontalTimerBackwards = function horizontalTimerBackwards() {
            if (parseFloat($('line.' + el).attr('x2')) + draw_line_increment > parseFloat($('line.' + el).attr('max-x2'))) {
                $('line.' + el).attr('x2', parseFloat($('line.' + el).attr('x2')) - draw_line_increment);
            } else {
                $('line.' + el).attr('x2', $('line.' + el).attr('max-x2')) /*.attr('executed', 'true')*/;
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        };

        var horizontalTimerForward = function horizontalTimerForward() {
            if (parseFloat($('line.' + el).attr('x2')) + draw_line_increment < parseFloat($('line.' + el).attr('max-x2'))) {
                $('line.' + el).attr('x2', parseFloat($('line.' + el).attr('x2')) + draw_line_increment);
            } else {
                $('line.' + el).attr('x2', $('line.' + el).attr('max-x2')) /*.attr('executed', 'true')*/;
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        };

        stoppers.push(el);
        if (position == 'vertical') {
            intervals_arr[el] = setInterval(verticalTimer, draw_line_interval);
        } else if (position == 'horizontal') {
            if (parseFloat($('line.' + el).attr('x2')) > parseFloat($('line.' + el).attr('max-x2'))) {
                //if horizontal line drawing from right to left
                intervals_arr[el] = setInterval(horizontalTimerBackwards, draw_line_interval);
            } else {
                //if horizontal line drawing from left to right
                intervals_arr[el] = setInterval(horizontalTimerForward, draw_line_interval);
            }
        }
    }
}

//checking if there is tail and it position and call it on parent finish
function callTheTail(tail, tail_position, action) {
    //doing this check, because IE 11 not support ES6
    if (tail === undefined) {
        tail = null;
    }
    if (tail_position === undefined) {
        tail_position = null;
    }
    if (action === undefined) {
        action = null;
    }

    if (tail != null && tail_position != null) {
        if (tail.length > 0 && tail_position.length > 0) {
            var next_tail = tail[0];
            var next_tail_position = tail_position[0];
            tail.shift();
            tail_position.shift();
            drawLine(next_tail, next_tail_position, tail, tail_position, action);
        } else if (action != null) {
            callActionOnLastTailFinish(action);
        }
    }
}

//execute logic when group of lines is being executed
function callActionOnLastTailFinish(action) {
    switch (action) {
        case 'load-successful-practices-gif':
            if (basic.isInViewport($('.homepage-container .successful-practices .content figure img'))) {
                $('.homepage-container .successful-practices .content figure img').attr("src", $('.homepage-container .successful-practices .content figure img').attr('data-gif') + '?' + new Date().getTime()).on('load', function () {
                    $('.homepage-container .successful-practices .content figure img').addClass('active');
                });
            } else {
                $('.homepage-container .successful-practices .content figure img').attr("src", $('.homepage-container .successful-practices .content figure img').attr('data-svg') + '?' + new Date().getTime()).on('load', function () {
                    $('.homepage-container .successful-practices .content figure img').addClass('active');
                });
            }
            //description fade-in animation
            $('.homepage-container .below-successful-practices .between-sections-description').removeClass('visibility-hidden').addClass('fade-in-animation');
            break;
        case 'load-buy-dentacoin-gif':
            if (basic.isInViewport($('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img'))) {
                $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr("src", $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr('data-gif') + '?' + new Date().getTime()).on('load', function () {
                    $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').addClass('active');
                });
            } else {
                $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr("src", $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr('data-svg') + '?' + new Date().getTime()).on('load', function () {
                    $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').addClass('active');
                });
            }
            //description fade-in animation
            $('.homepage-container .buy-dentacoin .between-sections-description').removeClass('visibility-hidden').addClass('fade-in-animation');
            break;
        case 'load-roadmap-gif':
            if (basic.isInViewport($('.homepage-container .roadmap-timeline img'))) {
                $('.homepage-container .roadmap-timeline img').attr("src", $('.homepage-container .roadmap-timeline img').attr('data-gif') + '?' + new Date().getTime()).on('load', function () {
                    $('.homepage-container .roadmap-timeline img').addClass('active');
                });
            } else {
                $('.homepage-container .roadmap-timeline img').attr("src", $('.homepage-container .roadmap-timeline img').attr('data-svg') + '?' + new Date().getTime()).on('load', function () {
                    $('.homepage-container .roadmap-timeline img').addClass('active');
                });
            }
            for (var i = 0, len = $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').length; i < len; i += 1) {
                $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').eq(i).addClass('fade-in-animation-' + (i + 1));
            }
            break;
        case 'fade-in-transaction-with-dcn':
            $('.homepage-container .below-buy-dentacoin .between-sections-description').removeClass('visibility-hidden').addClass('fade-in-animation');
        case 'call-sixth-and-animation':
            $('.homepage-container .below-successful-practices .description .wrapper').removeClass('visibility-hidden').addClass('fade-in-animation');
            drawLine('sixth', 'horizontal', ['seventh'], ['vertical']);
    }
}

// ==================== PAGES ====================

//HOMEPAGE
if ($('.homepage-container').length > 0) {
    var openVideo = function openVideo() {
        $(this).slideUp(500);
        $(this).unbind("click", openVideo).closest('.video').find('.video-wrapper').show().animate({
            width: "100%"
        }, 500);
    };
    // ===== /first section video logic =====

    //logic for open application popup


    if (isMobile) {
        $('.homepage-container.mobile .successful-practices .content .content-container').removeClass('col-md-5 col-md-offset-2').addClass('col-md-12');
        $('.homepage-container.mobile .successful-practices .content figure').removeClass('col-md-5').addClass('col-md-10 col-md-offset-1');
        $('.homepage-container.mobile .below-successful-practices .flex .description-over-line').removeClass('col-md-7 col-md-offset-0').addClass('col-md-8 col-md-offset-2');
        $('.homepage-container.mobile .below-successful-practices .flex .cells').removeClass('col-md-5');
        $('.homepage-container.mobile .buy-dentacoin .wallet-app-and-gif .wallet-app').removeClass('col-md-5 col-md-offset-1');
        $('.homepage-container.mobile .buy-dentacoin .wallet-app-and-gif .gif').removeClass('col-md-5 col-md-offset-1').addClass('col-sm-10 col-sm-offset-1');
    } else {
        //set all fullpage sections with window height
        for (var i = 0, len = $('.fullpage-section').length; i < len; i += 1) {
            if ($('.fullpage-section').eq(i).outerHeight() != $(window).height()) {
                $('.fullpage-section').outerHeight($(window).height());
            }
        }

        //center vertically the 'show more' button in testimonials section
        $('.homepage-container .testimonials .below-expressions .show-more').css({ 'top': 'calc(50% - ' + $('.homepage-container .testimonials .expressions').height() / 2 + 'px)' });

        //drawing lines logic
        $('svg.svg-with-lines').height($(document).height());
        setLinesDots();
        drawLine('first', 'vertical');
    }

    // ===== first section video logic =====
    $('.homepage-container .intro .bg-wrapper .video .play-btn').bind("click", openVideo);
    $('.homepage-container .intro .bg-wrapper .video .video-wrapper .close-video').click(function () {
        $(this).closest('.video-wrapper').find('video').get(0).pause();
        $(this).closest('.video-wrapper').animate({
            width: "60px"
        }, {
            duration: 500,
            complete: function complete() {
                $(this).closest('.video-wrapper').hide();
                $(this).closest('.video').find('.play-btn').slideDown(500, function () {
                    $(this).bind("click", openVideo).focus();
                });
            }
        });
    });

    $('.single-application').click(function () {
        var this_btn = $(this).find('.wrapper');
        var extra_html = '';
        if (this_btn.attr('data-articles') != undefined) {
            extra_html += '<div class="extra-html"><div class="extra-title">Latest Blog articles:</div><ul>';
            var articles_arr = $.parseJSON(this_btn.attr('data-articles'));
            for (var i = 0, len = articles_arr.length; i < len; i += 1) {
                extra_html += '<li class="link"><a href="https://blog.dentacoin.com/' + articles_arr[i]['post_name'] + '" target="_blank">' + articles_arr[i]['post_title'] + '</a></li>';
            }
            extra_html += '</ul><div class="see-all"><a href="https://blog.dentacoin.com/" class="white-blue-rounded-btn" target="_blank">GO TO ALL</a></div></div>';
        }
        var html = '<div class="container-fluid"><div class="row"><figure class="col-sm-6 gif"><img src="' + this_btn.attr('data-image') + '?' + new Date().getTime() + '" alt="' + this_btn.attr('data-image-alt') + '"/></figure><div class="col-sm-6 col-xs-12 content"><figure class="logo"><img src="' + this_btn.attr('data-popup-logo') + '" alt="' + this_btn.attr('data-popup-logo-alt') + '"/></figure><div class="title">' + this_btn.find('figcaption').html() + '</div><div class="description">' + $.parseJSON(this_btn.attr('data-description')) + '</div>' + extra_html + '</div></div></div>';
        basic.showDialog(html, 'application-popup', this_btn.attr('data-slug'));
    });

    //logic for open testimonials and close the ones that are too near to the current opening one (TESTIMONIALS)
    $('.homepage-container .testimonials .circle-wrapper').click(function () {
        $(this).addClass('active').removeClass('not-active');
        var this_text = $(this).find('.text');
        var text_width = 250;
        for (var i = 0; i < $('.homepage-container .testimonials .circle-wrapper.active').length; i += 1) {
            var current_active_testimonial = $('.homepage-container .testimonials .circle-wrapper.active').eq(i);
            if (!current_active_testimonial.is($(this))) {
                if (current_active_testimonial.find('.text').offset().left > this_text.offset().left) {
                    if (current_active_testimonial.find('.text').offset().left - this_text.offset().left < text_width) {
                        current_active_testimonial.removeClass('active').addClass('not-active');
                    }
                } else if (current_active_testimonial.find('.text').offset().left < this_text.offset().left) {
                    if (this_text.offset().left - current_active_testimonial.find('.text').offset().left < text_width) {
                        current_active_testimonial.removeClass('active').addClass('not-active');
                    }
                }
            }
        }
    });

    //load random default avatar for testimonial givers without avatar
    var testimonial_icons = ['avatar-icon-1.svg', 'avatar-icon-2.svg'];
    for (var i = 0; i < $('.homepage-container .testimonials .circle-wrapper.no-image').length; i += 1) {
        $('.homepage-container .testimonials .circle-wrapper.no-image').eq(i).find('.circle .background').css({ 'background-image': 'url(/assets/images/' + testimonial_icons[Math.floor(Math.random() * testimonial_icons.length)] + ')' });
    }

    //logic for show/hide different exchange methods on click in BUY DCN section
    $('.homepage-container .exchange-platforms-and-wallets .exchange-method .title').click(function () {
        if ($(this).closest('.exchange-method').hasClass('active')) {
            $(this).closest('.exchange-method').removeClass('active').find('.list').slideUp(300);
        } else {
            if (isMobile) {
                $('.homepage-container .exchange-platforms-and-wallets .exchange-method').removeClass('active').find('.list').slideUp(300);
            }
            $(this).closest('.exchange-method').addClass('active').find('.list').slideDown(300);
        }
    });

    //init slider for publications
    $('.homepage-container .awards-and-publications .publications-slider').slick({
        centerMode: true,
        centerPadding: '140px',
        slidesToShow: 3,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
        accessibility: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '200px'
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '50px'
            }
        }]
    });

    //on click make slide active
    $('.homepage-container .awards-and-publications .publications-slider .single-slide').on("click", function () {
        $('.homepage-container .awards-and-publications .publications-slider').slick('slickGoTo', $(this).attr('data-slick-index'));
    });

    $('.homepage-container .awards-and-publications .publications-slider .single-slide').keypress(function (e) {
        if (e.key === ' ' || e.key === 'Spacebar' || e.which === 13) {
            // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
            e.preventDefault();
            $('.homepage-container .awards-and-publications .publications-slider').slick('slickGoTo', $(this).attr('data-slick-index'));
        }
    });
}

//TESTIMONIALS
if ($('.testimonials-container').length > 0) {

    //LINE GOING UNDER TESTIMONIAL AVATARS
    var _testimonialAvatarsLine = function _testimonialAvatarsLine() {
        $('line.first').attr('x1', $('.testimonials-container .list .single .first-dot').offset().left + $('.testimonials-container .list .single .first-dot').width() / 2);
        $('line.first').attr('x2', $('.testimonials-container .list .single .last-dot').offset().left + $('.testimonials-container .list .single .last-dot').width() / 2);
        $('line.first').attr('y1', $('.testimonials-container .list .single .first-dot').offset().top);
        $('line.first').attr('y2', $('.testimonials-container .list .single .last-dot').offset().top);
    };

    //load random default avatar for testimonial givers without avatar
    var testimonial_icons_listing_page = ['avatar-icon-1.svg', 'avatar-icon-2.svg'];
    for (var i = 0; i < $('.list .single .image.no-avatar').length; i += 1) {
        $('.list .single .image.no-avatar').eq(i).css({ 'background-image': 'url(/assets/images/' + testimonial_icons_listing_page[Math.floor(Math.random() * testimonial_icons_listing_page.length)] + ')' });
    }

    $('svg.svg-with-lines').height($(document).height());
    _testimonialAvatarsLine();
}

//PARTNER NETWORK
if ($('body').hasClass('partner-network')) {
    initMap();

    //filtering google map by location type
    $('.partner-network-container .filter select').on('change', function () {
        if ($(this).val() != '') {
            initMap(true);
        } else {
            initMap();
        }
    });

    //logic for show/hide locations
    $('.partner-network-container .list-with-locations .subtype-title').click(function () {
        var this_title = $(this);
        if (!this_title.hasClass('opened')) {
            $('.partner-network-container .list-with-locations .clinics').slideUp(300);
            $('.partner-network-container .list-with-locations .subtype-title').removeClass('opened').find('i').removeClass('active');
            this_title.addClass('opened').find('i').addClass('active');
            this_title.next().slideDown({
                duration: 300,
                complete: function complete() {
                    $('html, body').animate({ 'scrollTop': this_title.offset().top - this_title.outerHeight() }, 300);
                }
            });
        } else {
            $('.partner-network-container .list-with-locations .clinics').slideUp(300);
            $('.partner-network-container .list-with-locations .subtype-title').removeClass('opened').find('i').removeClass('active');
        }
    });
}

// ==================== /PAGES ====================

//checking if submitted email is valid
function newsletterRegisterValidation() {
    $('.newsletter-register form').on('submit', function (event) {
        var this_form = $(this);
        var errors = [];
        if (!basic.validateEmail(this_form.find('input[type="email"]').val().trim())) {
            this_form.addClass('not-valid').append('<div class="alert alert-danger">' + this_form.find('input[type="email"]').closest('.form-row').attr('data-valid-email-message') + '</div>');
            errors.push(this_form.find('input[type="email"]').closest('.form-row').attr('data-valid-email-message'));
        }
        if (!this_form.find('#agree-with-privacy-policy').is(':checked')) {
            errors.push(this_form.find('#agree-with-privacy-policy').closest('.form-row').attr('data-valid-message'));
        }

        if (errors.length > 0) {
            event.preventDefault();
            this_form.addClass('not-valid').find('.alert').remove();
            for (var i = 0, len = errors.length; i < len; i += 1) {
                this_form.append('<div class="alert alert-danger">' + errors[i] + '</div>');
            }
        } else {
            this_form.removeClass('not-valid').find('.alert').remove();
            //this_form.find('input[type="email"]').val('');
            //this_form.find('#agree-with-privacy-policy').prop('checked', false);
            this_form.append('<div class="alert alert-success">' + this_form.attr('data-success-message') + '</div>');
        }
    });
}
newsletterRegisterValidation();

function stopMaliciousInspect() {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    document.onkeydown = function (e) {
        if (event.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    };
}
//stopMaliciousInspect();

function hidePopupOnBackdropClick() {
    $(document).on('click', '.bootbox', function () {
        var classname = event.target.className;
        classname = classname.replace(/ /g, '.');

        if (classname && !$('.' + classname).parents('.modal-dialog').length) {
            bootbox.hideAll();
        }
    });
}
hidePopupOnBackdropClick();