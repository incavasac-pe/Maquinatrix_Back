 
INSERT INTO public.category
(id_category, category, description, status_id)
VALUES(5, 'Equipos y herramientas', 'Incluye los equipos', 1);
 

ALTER TABLE public.product_details ADD includes_contract bool NULL;
ALTER TABLE public.product_details ADD includes_warranty bool NULL;
ALTER TABLE public.product_details ADD includes_dispatch bool NULL;

 
ALTER TABLE public.users ADD codepassword varchar(10) NULL;

