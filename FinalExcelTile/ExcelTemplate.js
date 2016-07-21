(function (tileDataContext, $, undefined) {
    (function (templates) {
        (function (template) {

            template.PreContainerProcess = function (options) {

                var deferred = $.Deferred();
                var defaults = {
                    html: undefined,
                    TileTitle: undefined
                };

                var settings = $.extend({}, defaults, options);
                var element = $(settings.html);
                $('.tbc-title', element).html(settings.TileTitle);
                deferred.resolve();

                return deferred;
            }

            template.PostContainerProcess = function (options) {

                var deferred = $.Deferred();
                
                var defaults = {
                    animatedTile: undefined,
                    tileContainer: undefined
                };

                var settings = $.extend({}, defaults, options);

                // $('.prevslide', settings.tileContainer).click(function () {
                //     $(settings.animatedTile).liveTile("goto", "prev");

                // });
                // $('.nextslide', settings.tileContainer).click(function () {
                //     $(settings.animatedTile).liveTile("goto", "next");
                // });
                deferred.resolve();

                return deferred;
            }

            template.GetData = function (options) {
                /// <summary>
                /// Implement custom data access function. To this method to be invoked, customDataAccess property 
                /// must set to true in template
                /// </summary>
                /// <param name="options" type="type">
                /// { fields: undefined, parameter: undefined, data: undefined }
                /// 
                /// fields: Fields expected by engine
                /// parameter: Applies only when requeted by inner field. This container field name.
                /// data: Applies only when final data access. Contains user input for all fields.
                /// </param>
                /// <returns type=""></returns>
                var deferred = $.Deferred();

                var defaults = { fields: undefined, parameter: undefined, data: undefined, cacheInfo: undefined };
                var settings = $.extend({}, defaults, options);

                deferred.resolve([]);

                return deferred;
            }

            template.PostDataProcess = function (html, options, containerInfo, currentTemplate) {
                var deferred = $.Deferred();

                var defaults = {
                    Direction: undefined,
                    Delay: undefined, Bounce: undefined, AnimationDirection: undefined, Speed: undefined , DocName:undefined, DocUrl:undefined, Width:undefined, Height:undefined, DocDescription:undefined
                };
                var settings = $.extend({}, defaults, options);

                var element = $(html);

                var frameLoaded = false;
                $(element).css('background-color', '#1D7044');
                switch(containerInfo.Mode) {
                    case "Small":
                        $(".excel-preview" , element).html("<img class='preview-icon' src='"+currentTemplate.dataLocation+"/previewIcon.png'>");
                        $(".excel-docname" , element).html("<a href="+settings.DocUrl+" data-toggle='tooltip' title='"+settings.DocName+"' class='TileLargeContainer'>"+settings.DocName+"</a>");
                        $(".excel-body" , element).html("<img class='TileImage' src='"+currentTemplate.dataLocation+"/excelIcon.png'>");
                        $(".excel-title",element).html("<div class='TileTitle'>Excel Online</div>");
                        $(".excel-block",element).css('height', '0%');
                        $(".excel-pop-up" , element).html("<iframe height='"+settings.Height+"px' width='"+settings.Width+"px' src="+settings.DocUrl+"></iframe>");
                        $('.excel-docname').addClass('col-md-8');
                        $('.excel-preview').addClass('col-md-4');
                        $(".preview-icon" , element).mouseenter(function(){
                            if (!frameLoaded) {
                                frameLoaded= true;
                                
                                $('.excel-pop-up').bPopup({
                                    follow: [false, false], //x, y
                                    position: [element.offset().left+element.width()+20, element.offset().top] //x, y
                                });
                            }
                        });

                        $(".preview-icon" , element).mouseleave(function(){
                            // $('#element_to_pop_up').bPopup().close();
                            frameLoaded= false;
                        });
                        break;
                    case "Large":
                        $(".excel-preview" , element).html("<img class='preview-icon' src='"+currentTemplate.dataLocation+"/previewIcon.png'>");
                        $(".excel-docname" , element).html("<a href="+settings.DocUrl+" data-toggle='tooltip' title='"+settings.DocName+"' class='TileLargeContainer'>"+settings.DocName+"</a>");
                        $(".excel-title",element).html("<div class='TileTitle'>Excel Online</div>");
                        $(".excel-docdesc" , element).html("<div>"+settings.DocDescription+"</div>");
                        $(".excel-pop-up" , element).html("<iframe height='"+settings.Height+"px' width='"+settings.Width+"px' src="+settings.DocUrl+"></iframe>");
                        $('.excel-docname').addClass('col-md-10');
                        $('.excel-preview').addClass('col-md-2');
                        $(".excel-preview" , element).mouseenter(function(){
                            if (!frameLoaded) {
                                frameLoaded= true;
                                
                                $('.excel-pop-up').bPopup({
                                    follow: [false, false], //x, y
                                    position: [element.offset().left+element.width()+20, element.offset().top] //x, y
                                });
                            }
                        });

                        $(".excel-preview" , element).mouseleave(function(){
                            // $('#element_to_pop_up').bPopup().close();
                            frameLoaded= false;
                        });
                        $(".excel-block",element).css('height', '40%');
                        break;
                    case "ExtraLarge":
                        $(".excel-docname" , element).html("<a href="+settings.DocUrl+" data-toggle='tooltip' title='"+settings.DocName+"' class='TileLargeContainer'>"+settings.DocName+"</a>");
                        $(".excel-title",element).html("<div class='TileTitle'>Excel Online</div>");
                        $(".excel-docdesc" , element).html("<div>"+settings.DocDescription+"</div>");
                        $(".excel-document" , element).html("<iframe src="+settings.DocUrl+"></iframe>");
                        $(".excel-block",element).css('height', '15%');
                        $(".excel-document",element).css('height', '55%'); 
                        $('.excel-docname').addClass('col-md-8');
                        $('.excel-preview').addClass('col-md-4');   
                        break;
                    // case "Universal":
                    //     code block
                    //     break;
                    default:    
                        $(".excel-body" , element).html("<img class='TileImage' src='excelIcon.png'>");
                        $(".excel-title",element).html("<div class='TileTitle'>Excel Online</div>")
                }

                deferred.resolve(element);
                return deferred;
            };

            template.PostCssProcess = function (html, options, containerInfo, currentTemplate) {
                var deferred = $.Deferred();
                var defaults = { FeedUrl: undefined };
                var settings = $.extend({}, defaults, options);
                var element = $(html);
                deferred.resolve(element);
                return deferred;
            };

        }(templates.ExcelTemplate = templates.ExcelTemplate || {}));
    }(tileDataContext.Templates = tileDataContext.Templates || {}));
}(window.TileDataContext = window.TileDataContext || {}, jQuery));