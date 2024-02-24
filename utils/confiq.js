import { create } from 'apisauce'

export const baseURL = "http://144.126.247.97:8080/api"
// export const baseURL = "http://localhost:8080/api"

export const API = create({
    baseURL: baseURL
})

export const tempAPI = create({
    baseURL:"https://ecdata.bigdataghana.com/api"
})

export const categories = [
    {
        id: 1,
        name: "Food & Restaurant",
        key: "food_restaurant",
        color: "F4C63A"
    },
    {
        id: 2,
        name: "Bar & Nightlife",
        key: "bar_nightlife",
        color: "B269F6"
    },
    {
        id: 3,
        name: "Small Business",
        key: "small_business",
        color: "FC4A83"
    },
    {
        id: 4,
        name: "Accommodation",
        key: "accommodation",
        color: "5AC7FD"
    },
    {
        id: 5,
        name: "Tour & Activity",
        key: "tour_activity",
        color: "58E2C2"
    },
    {
        id: 6,
        name: "Event",
        key: "event",
        color: "FC4F4F"
    },
    {
        id: 7,
        name: "Beauty & Spa",
        key: "beauty_spa",
        color: "FC4AB4"
    }
]

export const countries = [
    {
        label: "Ghana",
        value: "Ghana"
    }
]

export const cities = [
    { label: "Abokobi", value: "Abokobi" },
    { label: "Aburi", value: "Aburi" },
    { label: "Accra", value: "Accra" },
    { label: "Ada Foah", value: "Ada Foah" },
    { label: "Adenta", value: "Adenta" },
    { label: "Adum", value: "Adum" },
    { label: "Agogo", value: "Agogo" },
    { label: "Agotime-Kpetoe", value: "Agotime-Kpetoe" },
    { label: "Ahwiaa", value: "Ahwiaa" },
    { label: "Akatsi", value: "Akatsi" },
    { label: "Akosombo", value: "Akosombo" },
    { label: "Akropong", value: "Akropong" },
    { label: "Akuapem Mamfe", value: "Akuapem Mamfe" },
    { label: "Akwatia", value: "Akwatia" },
    { label: "Anomabu", value: "Anomabu" },
    { label: "Anyako", value: "Anyako" },
    { label: "Anyanui", value: "Anyanui" },
    { label: "Apam", value: "Apam" },
    { label: "Apremdo", value: "Apremdo" },
    { label: "Ashaley Botwe", value: "Ashaley Botwe" },
    { label: "Asikuma", value: "Asikuma" },
    { label: "Atimpoku", value: "Atimpoku" },
    { label: "Awutu", value: "Awutu" },
    { label: "Axim", value: "Axim" },
    { label: "Bantama", value: "Bantama" },
    { label: "Bawku", value: "Bawku" },
    { label: "Bechem", value: "Bechem" },
    { label: "Begoro", value: "Begoro" },
    { label: "Bekwai", value: "Bekwai" },
    { label: "Berekum", value: "Berekum" },
    { label: "Berekuso", value: "Berekuso" },
    { label: "Bimbilla", value: "Bimbilla" },
    { label: "Bolgatanga", value: "Bolgatanga" },
    { label: "Bongo", value: "Bongo" },
    { label: "Bunso", value: "Bunso" },
    { label: "Busua", value: "Busua" },
    { label: "Cape Coast", value: "Cape Coast" },
    { label: "Dambai", value: "Dambai" },
    { label: "Damongo", value: "Damongo" },
    { label: "Denu", value: "Denu" },
    { label: "Dodowa", value: "Dodowa" },
    { label: "Dormaa Ahenkro", value: "Dormaa Ahenkro" },
    { label: "Doryumu", value: "Doryumu" },
    { label: "Dwaben", value: "Dwaben" },
    { label: "Ejisu", value: "Ejisu" },
    { label: "Ekumfi-Ekrawfo", value: "Ekumfi-Ekrawfo" },
    { label: "Elmina", value: "Elmina" },
    { label: "Esiama", value: "Esiama" },
    { label: "Funsi", value: "Funsi" },
    { label: "Gambaga", value: "Gambaga" },
    { label: "Gomoa Fetteh", value: "Gomoa Fetteh" },
    { label: "Gushiegu", value: "Gushiegu" },
    { label: "Ho", value: "Ho" },
    { label: "Hohoe", value: "Hohoe" },
    { label: "Kade", value: "Kade" },
    { label: "Karaga", value: "Karaga" },
    { label: "Kasoa", value: "Kasoa" },
    { label: "Keta", value: "Keta" },
    { label: "Kibi", value: "Kibi" },
    { label: "Kintampo", value: "Kintampo" },
    { label: "Koforidua", value: "Koforidua" },
    { label: "Komenda", value: "Komenda" },
    { label: "Konongo", value: "Konongo" },
    { label: "Kpandu", value: "Kpandu" },
    { label: "Kpeve", value: "Kpeve" },
    { label: "Kumasi", value: "Kumasi" },
    { label: "Lawra", value: "Lawra" },
    { label: "Madina", value: "Madina" },
    { label: "Mampong", value: "Mampong" },
    { label: "Mankessim", value: "Mankessim" },
    { label: "Nalerigu", value: "Nalerigu" },
    { label: "Navrongo", value: "Navrongo" },
    { label: "Nkawkaw", value: "Nkawkaw" },
    { label: "Nkoranza", value: "Nkoranza" },
    { label: "Nkwatia", value: "Nkwatia" },
    { label: "Nsawam", value: "Nsawam" },
    { label: "Nsuta", value: "Nsuta" },
    { label: "Ntonso", value: "Ntonso" },
    { label: "Nyakrom", value: "Nyakrom" },
    { label: "Nyankpala", value: "Nyankpala" },
    { label: "Obuasi", value: "Obuasi" },
    { label: "Oda", value: "Oda" },
    { label: "Odumase", value: "Odumase" },
    { label: "Krobo Odumase", value: "Krobo Odumase" },
    { label: "Offinso", value: "Offinso" },
    { label: "Osu", value: "Osu" },
    { label: "Oyibi", value: "Oyibi" },
    { label: "Paga", value: "Paga" },
    { label: "Prampram", value: "Prampram" },
    { label: "Sakumono", value: "Sakumono" },
    { label: "Salaga", value: "Salaga" },
    { label: "Saltpond", value: "Saltpond" },
    { label: "Savelugu", value: "Savelugu" },
    { label: "Sawla", value: "Sawla" },
    { label: "Sekondi-Takoradi", value: "Sekondi-Takoradi" },
    { label: "Shama", value: "Shama" },
    { label: "Sogakope", value: "Sogakope" },
    { label: "Somanya", value: "Somanya" },
    { label: "Sunyani", value: "Sunyani" },
    { label: "Tamale", value: "Tamale" },
    { label: "Tarkwa", value: "Tarkwa" },
    { label: "Tegbi", value: "Tegbi" },
    { label: "Tema", value: "Tema" },
    { label: "Teshie", value: "Teshie" },
    { label: "Wa", value: "Wa" },
    { label: "Walewale", value: "Walewale" },
    { label: "Weija", value: "Weija" },
    { label: "Wenchi", value: "Wenchi" },
    { label: "Winneba", value: "Winneba" },
    { label: "Woe", value: "Woe" },
    { label: "Yeji", value: "Yeji" },
    { label: "Yendi", value: "Yendi" },
    { label: "Zebilla", value: "Zebilla" }
];
