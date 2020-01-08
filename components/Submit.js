import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
//import { ALL_POSTS_QUERY, allPostsQueryVars } from './PostList'

const CREATE_PRODUCT_MUTATION = gql`
  mutation createNewProduct(
    $ref: Int
    $parent: Int
    $sku: String
    $upc: Int
    $releaseDate: LocalDate
    $price: Float
    $title: String
    $active: Boolean
  ) {
    createNewProduct(
      product: {
        ref: $ref
        parent: $parent
        sku: $sku
        upc: $upc
        releaseDate: $releaseDate
        price: {amount: $price, currency: "OMR"}
        title: $title
        active: $active
        variationOptions: [
          { name: "Color", values: ["REd", "Blue"] }
          { name: "Size", values: ["Green", "Yellow"] }
        ]
      }
    ) {
      ref
      releaseDate
      variationOptions {
        name
        values
      }
    }
  }
`;

const Submit = () => {
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const ref = formData.get("ref");
    const parent = formData.get("parent");
    const sku = formData.get("sku");
    const upc = formData.get("upc");
    const releaseDate = formData.get("releaseDate");
    const price = formData.get("price");
    const title = formData.get("title");
    const active = formData.get("active");

    form.reset();

    createProduct({
      variables: { ref, parent, sku, upc, releaseDate, price, title, active },
      update: (proxy, { data: { createPost } }) => {
        /*const data = proxy.readQuery({
          query: ALL_POSTS_QUERY,
          variables: allPostsQueryVars,
        })*/
        console.log("product added successfully");
        // Update the cache with the new post at the top of the
        /*proxy.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            ...data,
            allPosts: [createPost, ...data.allPosts],
          },
          variables: allPostsQueryVars,
        })*/
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit </h1>

      <input placeholder="ref" name="ref" type="text" required value="1212" />
      <input
        placeholder="parent"
        name="parent"
        type="text"
        required
        value="1212"
      />
      <input placeholder="sku" name="sku" type="text" required value="1212" />
      <input placeholder="upc" name="upc" type="text" required value="1212" />
      <input
        placeholder="releaseDate"
        name="releaseDate"
        type="text"
        required
        value="2019-10-10"
      />
      <input
        placeholder="price"
        name="price"
        type="text"
        required
        value="12.12"
      />
      <input
        placeholder="title"
        name="title"
        type="text"
        required
        value="Test with Apollo"
      />
      <input
        placeholder="active"
        name="active"
        type="text"
        required
        value="1"
      />

      <button type="submit" disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  );
};

export default Submit;
