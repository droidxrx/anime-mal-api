/// <reference types="./types.d.ts" />
import { superdeno } from "https://deno.land/x/superdeno@4.4.0/mod.ts";
import{ create as pkcegenerate, createChallenge as pkcecreateChallenge } from "https://deno.land/x/pkce_deno@v2.0/mod.ts";
function httpApi(token,path1,method1,query={}){const params=stringnify(query),http=()=>superdeno("https://api.myanimelist.net/v2")[method1](path1).set({Authorization:`Bearer ${token}`});return new Promise((function(reso,reje){const resolve=r2=>reso({status:!0,return:r2.body}),reject=r2=>reje({status:!1,return:r2.body});"delete"===method1&&http().then((r2=>"error"in r2.body?reject(r2):resolve(r2))).catch((e=>reje({status:!1,return:e}))),"get"===method1&&http().query(params).then((r2=>"error"in r2.body?reject(r2):resolve(r2))).catch((e=>reje({status:!1,return:e}))),"put"===method1&&http().send(params).type("application/x-www-form-urlencoded").then((r2=>"error"in r2.body?reject(r2):resolve(r2))).catch((e=>reje({status:!1,return:e})))}))}function httpOauth2(data){return new Promise((function(resolve,reject){const data1=(status,r2)=>({status:status,return:r2.body});superdeno("https://myanimelist.net/v1/oauth2").post("/token").send(stringnify(data)).type("application/x-www-form-urlencoded").then((r2=>"error"in r2.body?(resolve(data1(!1,r2)),reject(data1(!1,r2))):resolve(data1(!0,r2)))).catch((e=>reject(data1(!1,e))))}))}function stringnify(obj,prefix=""){const isArray4=val=>Array.isArray(val),params=`${prefix}${new URLSearchParams((obj1=>{const newObj={};for(const key in obj1){const valProp=obj1[key];[void 0,null,""].includes(valProp)||(isArray4(valProp)?newObj[key]=valProp.toString():newObj[key]=valProp)}return newObj})(obj)).toString()}`;return decodeURIComponent(params)}const AnimeFull=["id","title","main_picture","alternative_titles","start_date","end_date","synopsis","mean","rank","popularity","num_list_users","num_scoring_users","nsfw","genres","created_at","updated_at","media_type","status","my_list_status","num_episodes","start_season","broadcast","source","average_episode_duration","rating","studios","pictures","background","related_anime","related_manga","recommendations","statistics"],AnimeInList=["id","title","main_picture","alternative_titles","start_date","end_date","synopsis","mean","rank","popularity","num_list_users","num_scoring_users","nsfw","genres","created_at","updated_at","media_type","status","my_list_status","num_episodes","start_season","broadcast","source","average_episode_duration","rating","studios"],AnimeListFields=["status","score","num_watched_episodes","is_rewatching","start_date","finish_date","priority","num_times_rewatched","rewatch_value","tags","updated_at","id","title","main_picture","alternative_titles","end_date","synopsis","mean","rank","popularity","num_list_users","num_scoring_users","nsfw","genres","created_at","media_type","my_list_status","num_episodes","start_season","broadcast","source","average_episode_duration","rating","studios"],MangaFull=["id","title","main_picture","alternative_titles","start_date","end_date","synopsis","mean","rank","popularity","num_list_users","num_scoring_users","nsfw","genres","created_at","updated_at","media_type","status","my_list_status","num_volumes","num_chapters","authors","pictures","background","related_anime","related_manga","recommendations","serialization"],MangaInList=["id","title","main_picture","alternative_titles","start_date","end_date","synopsis","mean","rank","popularity","num_list_users","num_scoring_users","nsfw","genres","created_at","updated_at","media_type","status","my_list_status","num_volumes","num_chapters","authors"],MangaListFields=["status","score","num_volumes_read","num_chapters_read","is_rereading","start_date","finish_date","priority","num_times_reread","reread_value","tags","updated_at","id","title","main_picture","alternative_titles","end_date","synopsis","mean","rank","popularity","num_list_users","num_scoring_users","nsfw","genres","created_at","media_type","my_list_status","num_volumes","num_chapters","authors"],UserField=["id","name","picture","gender","birthday","location","joined_at","anime_statistics","time_zone","is_supporter"];class anime{#token;constructor(access_token){this.#token=access_token}id(id,fields=AnimeFull){return fields=fields||AnimeFull,httpApi(this.#token,`/anime/${id}`,"get",{fields:fields})}search(q,offset=0,limit=100,fields=AnimeInList){return fields=fields||AnimeInList,httpApi(this.#token,"/anime","get",{q:q,limit:limit,offset:offset,fields:fields})}ranking(ranking_type="all",offset=0,limit=100,fields=AnimeInList){return fields=fields||AnimeInList,httpApi(this.#token,"/anime/ranking","get",{ranking_type:ranking_type,limit:limit,offset:offset,fields:fields})}seasonal(year=(new Date).getFullYear(),season=function(month){return month<3?"winter":month>2&&month<6?"spring":month>5&&month<9?"summer":"fall"}((new Date).getMonth()),offset=0,limit=100,sort="",fields=AnimeInList){const ifseasonincorect={status:!1,return:{error:"Enter a valid season: winter, spring, summer, fall"}};return fields=fields||AnimeInList,month=season,["winter","spring","summer","fall"].find((elm=>elm===month))===month?httpApi(this.#token,`/anime/season/${year}/${season}`,"get",{year:year,season:season,offset:offset,limit:limit,sort:sort,fields:fields}):new Promise((function(resolve,reject){resolve(ifseasonincorect),reject(ifseasonincorect)}));var month}suggestions(offset=0,limit=100,fields=AnimeInList){return fields=fields||AnimeInList,httpApi(this.#token,"/anime/suggestions","get",{offset:offset,limit:limit,fields:fields})}}class userAnimeList{#token;constructor(access_token1){this.#token=access_token1}getList(user_name="@me",offset=0,limit=100,fields=AnimeListFields){return fields=fields||AnimeListFields,httpApi(this.#token,`/users/${user_name}/animelist`,"get",{offset:offset,limit:limit,fields:fields})}deleteList(anime_id){return httpApi(this.#token,`/anime/${anime_id}/my_list_status`,"delete")}updateList(anime_id,fieldsToUdpate){return httpApi(this.#token,`/anime/${anime_id}/my_list_status`,"put",fieldsToUdpate)}}class manga{#token;constructor(access_token2){this.#token=access_token2}id(id,fields=MangaFull){return fields=fields||MangaFull,httpApi(this.#token,`/manga/${id}`,"get",{fields:fields})}search(q,offset=0,limit=100,fields=MangaInList){return fields=fields||MangaInList,httpApi(this.#token,"/manga","get",{q:q,limit:limit,offset:offset,fields:fields})}ranking(ranking_type="all",offset=0,limit=100,fields=MangaInList){return fields=fields||MangaInList,httpApi(this.#token,"/manga/ranking","get",{ranking_type:ranking_type,limit:limit,offset:offset,fields:fields})}}class userMangaList{#token;constructor(access_token3){this.#token=access_token3}getList(user_name="@me",offset=0,limit=100,fields=MangaListFields){return fields=fields||MangaListFields,httpApi(this.#token,`/users/${user_name}/mangalist`,"get",{offset:offset,limit:limit,fields:fields})}deleteList(manga_id){return httpApi(this.#token,`/manga/${manga_id}/my_list_status`,"delete")}updateList(manga_id,fieldsToUdpate){return httpApi(this.#token,`/manga/${manga_id}/my_list_status`,"put",fieldsToUdpate)}}class user{#token;constructor(access_token4){this.#token=access_token4}me(fields=UserField){return fields=fields||UserField,httpApi(this.#token,"/users/@me","get",{fields:fields})}}class oauth2{#client_id;#client_secret;constructor(CLIENT_ID,CLIENT_SECRET){this.#client_id=CLIENT_ID,this.#client_secret=CLIENT_SECRET}generatePKCEChallenge(length=43){if(length<43)throw new Error("Length Minimal 43");if(length>128)throw new Error("Length Maximal 128");const pkce=pkcegenerate(length);return{code_challenge:pkce.codeChallenge,code_verifier:pkce.codeVerifier}}verifyPKCEChallenge(code_verifier,code_challenge){return pkcecreateChallenge(code_verifier)===code_challenge}urlAuthorize(code_challenge,urlRedirect=""){const query={client_id:this.#client_id,code_challenge:code_challenge,code_challenge_method:"plain",redirect_uri:urlRedirect,response_type:"code"};return`https://myanimelist.net/v1/oauth2/authorize${stringnify(query,"?")}`}accessToken(code,code_challenge,urlRedirect=""){return httpOauth2({client_id:this.#client_id,client_secret:this.#client_secret,code:code,code_verifier:code_challenge,grant_type:"authorization_code",redirect_uri:urlRedirect})}refreshToken(refresh_token){return httpOauth2({client_id:this.#client_id,client_secret:this.#client_secret,refresh_token:refresh_token,grant_type:"refresh_token"})}}class API1{#token;constructor(ACCESS_TOKEN){this.#token=ACCESS_TOKEN}ANIME(){if(!this.#token)throw new Error("Please insert Access Token");return new anime(this.#token)}USER_ANIME_LIST(){if(!this.#token)throw new Error("Please insert Access Token");return new userAnimeList(this.#token)}MANGA(){if(!this.#token)throw new Error("Please insert Access Token");return new manga(this.#token)}USER_MANGA_LIST(){if(!this.#token)throw new Error("Please insert Access Token");return new userMangaList(this.#token)}USER(){if(!this.#token)throw new Error("Please insert Access Token");return new user(this.#token)}}export{API1 as API,oauth2 as OAUTH2};
const __default = { API: API1, OAUTH2: oauth2 };
export{ __default as default };