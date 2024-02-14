import baseApi from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({
        brand,
        name,
        category,
        connectivity,
        powerSource,
        operatingSystem,
        maxPrice,
      }) => {
        const params = new URLSearchParams();
        if (brand) params.append("brand", brand);

        if (name) params.append("name", name);

        if (category) params.append("category", category);

        if (connectivity) params.append("connectivity", connectivity);

        if (powerSource) params.append("powerSource", powerSource);

        if (operatingSystem) params.append("operatingSystem", operatingSystem);

        if (maxPrice) params.append("maxPrice", maxPrice);

        return {
          url: `/gadgets?${params}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `/gadgets/${id}`,
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/gadgets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    getSaleHistories: builder.query({
      query: () => ({
        url: "/gadgets/sales/histories",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getTotalRevenue: builder.query({
      query: () => ({
        url: "/gadgets/sales/revenue",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    sellProduct: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/gadgets/sell/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/gadgets/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/gadgets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteManyProducts: builder.mutation({
      query: (data) => ({
        url: `gadgets/delete/many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useGetSaleHistoriesQuery,
  useGetTotalRevenueQuery,
  useSellProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteManyProductsMutation,
} = productApi;
