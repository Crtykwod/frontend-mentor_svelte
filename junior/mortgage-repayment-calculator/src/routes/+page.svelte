<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import Radio from '$lib/components/Radio.svelte';

	import { formatCurrency, formatNumber } from '$lib/utils/formatting';

  
	let form: HTMLFormElement;
	let radioIdentifier: string = 'mortgageType';
  
  type MortgageType = "repayment" | "interestOnly";

	let formResult = {
    monthlyPayment: 0,
    totalRepayment: 0
  };

  let formErrors = {
    mortgageAmount: '',
    mortgageTerm: '',
    interestRate: '',
    mortgageType: ''
  };

  function calculateMonthlyPayment(
    amount: number,
    years: number,
    rate: number,
    type: MortgageType
  ): number {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    if (type === "interestOnly") {
      return amount * monthlyRate;
    }

    if (monthlyRate === 0) {
      return amount / months;
    }

    return (amount * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
  }

  function calculateTotalPayment(
    amount: number,
    years: number,
    rate: number,
    type: MortgageType
  ): number {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    if (type === "interestOnly") {
      const totalInterestPaid = amount * monthlyRate * months;
      return amount + totalInterestPaid;
    }

    return calculateMonthlyPayment(amount, years, rate, type) * months;
  }

  function getFormData() {
		const data = new FormData(form);

		return {
			mortgageAmount: Number(formatNumber(data.get('mortgageAmount')?.toString())),
			mortgageTerm: Number(formatNumber(data.get('mortgageTerm')?.toString())),
			interestRate: Number(formatNumber(data.get('interestRate')?.toString())),
			mortgageType: data.get('mortgageType') as MortgageType
		};
	}

	function validateForm() {
		const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = getFormData();

    formErrors = {
      mortgageAmount: mortgageAmount <= 0 ? 'Please enter a valid amount' : '',
      mortgageTerm: mortgageTerm <= 0 ? 'Please enter a valid term' : '',
      interestRate: interestRate < 0 ? 'Please enter a valid rate' : '',
      mortgageType: !mortgageType ? 'Please select a mortgage type' : '',
    }
	}

	function submitForm(event: Event) {
		event.preventDefault();
		validateForm();

		if (Object.values(formErrors).some(Boolean)) return;

    const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = getFormData();

    formResult = {
      monthlyPayment: calculateMonthlyPayment(mortgageAmount, mortgageTerm, interestRate, mortgageType),
      totalRepayment: calculateTotalPayment(mortgageAmount, mortgageTerm, interestRate, mortgageType),
    }
	}

  function resetForm() {
    form.reset();
    formResult = {
      monthlyPayment: 0,
      totalRepayment: 0
    };
  }
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 lg:max-w-5/6 xl:max-w-9/12">
  <div class="flex flex-col items-start gap-6 px-6 py-8 sm:p-10 bg-white sm:rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
    <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between w-full">
      <h1 class="text-subheading font-bold">Mortgage Calculator</h1>
      <button
        type="reset"
        onclick={resetForm}
        class="text-body-md cursor-pointer font-medium text-slate-700 underline">Clear All</button
      >
    </div>
  
    <form bind:this={form} onsubmit={submitForm} class="grid gap-6 w-full">
      <NumberInput
        title="Mortgage Amount"
        prefix={true}
        text="£"
        currency={true}
        error={formErrors.mortgageAmount}
      />
      <div class="grid sm:grid-cols-2 gap-6">
        <NumberInput
          title="Mortgage Term"
          prefix={false}
          text="years"
          error={formErrors.mortgageTerm}
        />
        <NumberInput title="Interest Rate" prefix={false} text="%" error={formErrors.interestRate} />
      </div>
  
      <fieldset class="grid gap-3">
        <legend class="text-body-md mb-3 font-medium text-slate-700">Mortgage Type</legend>
        <Radio value="Repayment" {radioIdentifier} group={radioIdentifier} />
        <Radio value="Interest Only" {radioIdentifier} group={radioIdentifier} />
        <p class="text-body-sm text-red-500">{formErrors.mortgageType}</p>
      </fieldset>
  
      <Button text="Calculate Repayments" action={submitForm} />
    </form>
  </div>
  
  <div class="bg-white sm:rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl">
    <div class="bg-slate-900 text-slate-300 sm:rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-[80px] h-full">
      <div class="flex flex-col {!formResult? "items-center gap-4 sm:" : "justify-center h-full gap-6 sm:gap-10"} py-8 px-6 sm:p-10">
        {#if !formResult.monthlyPayment && !formResult.totalRepayment}
            <img src="/images/illustration-empty.svg" alt="" class="max-h-[200px]" />
            <h2 class="text-subheading text-center font-bold text-white">Results shown here</h2>
            <p class="text-body-md text-center font-medium">
              Complete the form and click "calculate repayments" to see what your monthly repayments would
              be.
            </p>
        {:else}
          <div class="grid gap-4">
            <h2 class="text-subheading font-bold text-white">Your Results</h2>
            <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
          </div>
          <div class="grid relative gap-4 sm:gap-8 py-6 px-4 sm:p-8 bg-black/25 border-t-4 border-t-lime rounded-lg">
            <div class="grid gap-2">
              <h3>Your monthly repayments</h3>
              <p class="text-[2.5rem] sm:text-heading font-bold text-lime">£{formatCurrency(formResult.monthlyPayment.toFixed(2).toString())}</p>
            </div>
            <hr class="border-0 border-b border-b-slate-300/25">
            <div class="grid gap-2">
              <h3>Total you'll repay over the term</h3>
              <p class="text-subheading font-bold text-white">£{formatCurrency(formResult.totalRepayment.toFixed(2).toString())}</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>