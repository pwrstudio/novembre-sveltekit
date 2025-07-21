<script lang="ts">
  import { fade } from "svelte/transition"

  export let compact = false

  let emailAddress = ""
  let emailFirstName = ""
  let emailLastName = ""
  let emailCompany = ""
  let success = false
  let error = ""

  function validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function validateName(name: string): boolean {
    return name.trim().length > 0
  }

  const submit = async () => {
    // Reset error and success
    error = ""
    success = false

    // Validate email
    if (!validateEmail(emailAddress)) {
      error = "Please enter a valid email address."
      return
    }

    // Validate first name
    if (!validateName(emailFirstName)) {
      error = "Please enter your first name."
      return
    }

    // Validate last name
    if (!validateName(emailLastName)) {
      error = "Please enter your last name."
      return
    }

    // Company is optional, so we don't validate it

    const url = "/api/signup"

    const formData = new URLSearchParams()
    formData.append("email", emailAddress)
    formData.append("firstname", emailFirstName)
    formData.append("lastname", emailLastName)
    formData.append("company", emailCompany)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      await response.json()
      success = true
    } catch (err) {
      console.error(err)
      error = "An error occurred. Please try again."
    }
  }
</script>

<div id="mailing-list" class="mailing-list" class:compact>
  {#if success}
    <span in:fade>
      <strong>Thank you.</strong>
      <br />
      You will receive a sign up confirmation at the address {emailAddress}
      shortly.
    </span>
  {:else}
    {#if error}
      <p class="error">{error}</p>
    {/if}
    <form class="newsletter-signup" class:compact>
      {#if compact}
        <div class="form-section">Subscribe to NOVEMBRE DIGEST now!</div>
      {:else}
        <div class="form-section">NOVEMBRE DIGEST</div>
      {/if}

      <!-- {#if !compact} -->
      <div class="form-section">
        <input
          name="email_first_name"
          placeholder="FIRST NAME"
          class="mailing-list__input"
          bind:value={emailFirstName}
        />
      </div>

      <div class="form-section">
        <input
          name="email_last_name"
          placeholder="LAST NAME"
          class="mailing-list__input"
          bind:value={emailLastName}
        />
      </div>

      <div class="form-section">
        <input
          name="email_company"
          placeholder="COMPANY"
          class="mailing-list__input"
          bind:value={emailCompany}
        />
      </div>
      <!-- {/if} -->

      <div class="form-section">
        <input
          placeholder="EMAIL ADDRESS"
          class="mailing-list__input"
          bind:value={emailAddress}
        />
      </div>

      <div class="form-section submit-button">
        <button class="submit" on:click={submit}>Sign up</button>
      </div>
    </form>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .newsletter-signup {
    width: 100%;
    margin-bottom: $large-vertical-margin;
    line-height: 1em;
    font-family: $sans-stack;
    font-size: $large;

    @include screen-size("small") {
      font-size: $mobile-large;
      margin-bottom: $small-vertical-margin;
    }

    input {
      background: transparent;
      border: 0;
      line-height: 1em;
      padding: 0px;
      font-weight: 300;
      outline: none;
      color: currentColor;
      font-size: $large;
      font-family: $sans-stack;

      height: 1em;
      width: 95%;
      border-bottom: 3px solid $black;

      @include screen-size("small") {
        font-size: $mobile-large;
        border-bottom: 2px solid $black;
      }
    }

    .form-section {
      margin-bottom: 1em;
      width: 100%;

      &.submit-button {
        position: relative;
        height: 1em;
        color: var(--black);
      }
    }

    .submit {
      line-height: 1em;
      color: currentColor;
      font-size: $large;
      font-family: $sans-stack;

      @include screen-size("small") {
        font-size: $mobile-large;
      }

      background: transparent;
      outline: none;
      border: none;
      text-transform: uppercase;
      padding: 0;
      margin: 0;
      cursor: pointer;
      text-align: center;
      font-weight: 300;
      position: absolute;
      top: 0;
      left: 0;

      &:hover {
        top: 8px;
        left: -5px;
        font-family: $serif-stack;
        font-style: italic;
      }
    }

    &.compact {
      font-size: $intro;

      input {
        font-size: $intro;
        border-bottom: 1px solid $black;

        @include screen-size("small") {
          font-size: $mobile-intro;
          border-bottom: 1px solid $black;
        }
      }

      .submit {
        font-size: $intro;
        @include screen-size("small") {
          font-size: $mobile-intro;
        }

        &:hover {
          top: 3px;
          left: -5px;
        }
      }
    }
  }

  ::-webkit-input-placeholder {
    color: $black;
  }

  :-ms-input-placeholder {
    color: $black;
    opacity: 0.8;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-family: $sans-stack;
  }

  .error {
    color: red;
  }
</style>
